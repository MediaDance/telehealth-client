'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { MediaDanceClient, MediaDanceError } from '@mediadance/client-sdk';


// Mock credentials matching your backend validation setup
const MOCK_CREDENTIALS = {
  tenantID: 'tenant_zenspace_prod_01',
  roomID: 'sandbox-room-1',
  userID: `user_${Math.random().toString(36).substring(7)}`,
  role: 'clinician'
};

export default function TelehealthClient() {
  const [status, setStatus] = useState('Disconnected');
  const [joined, setJoined] = useState(false);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  
  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // Configuration for NAT traversal over local network testing
  const rtcConfig = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  };


  const client = useMemo(() => {
    return new MediaDanceClient({
      serverUrl: 'https://localhost:3001' // Points directly to your local infra server
    });
  }, []);

  // Basic React state to track room text or dynamic entry ids
  // const [status, setStatus] = useState('Idle');

  useEffect(() => {
    // Wire up event listeners as soon as the component mounts
    client.on('local-stream-ready', (stream) => { 
      if (localVideoRef.current) localVideoRef.current.srcObject = stream; 
    });
    
    client.on('remote-stream-ready', (stream) => { 
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream; 
    });
    
    client.on('status-update', (msg) => { setStatus(msg); });
    client.on('error', (err) => { setStatus(`Error: ${err.message}`); });

    return () => {
      // Optional cleanup: client.disconnect();
    };
  }, [client, setStatus]);


  useEffect(() => {
    const handleRuntimeError = (err: MediaDanceError) => {
      console.error("──> [Runtime Error Alert]:", err.code);
      setStatus(`Connection lost: ${err.message}`);
      // Take runtime recovery actions here (e.g., show a reconnect button)
    };

    client.on('error', handleRuntimeError);
    // Cleanup listener on unmount to prevent memory leaks!
    return () => {
      client.off('error', handleRuntimeError);
    };
  }, [client]);
  
  /**
   * Core function to initialize the telehealth session. This encapsulates the entire flow:
   * 1. Requests a secure session token and edge URL from your backend orchestrator.
   * 2. Passes these directly into the MediaDanceClient SDK to start the call.
   * 3. The SDK then handles all media capture, signaling, and peer connection setup under the hood.
   * 4. Status updates and errors are propagated back up to the UI via event listeners.
   */
  const handleInitializeSession = async () => {
    try {
      setStatus('Allocating clinical infrastructure near you...');
      
      // 2. Pass both straight into the SDK
      if (process.env.NODE_ENV === 'development') {
        await client.startCall(); // In dev, we can skip token validation for faster iteration); 
      } else {
        // 1. Fetch token and the auto-determined edge URL from your backend orchestrator
        const response = await fetch('/api/v1/sessions/mint-ticket');
        const { token, signalingUrl } = await response.json();
        console.log(`[Production Mode] Initializing session with token: ${token} and signaling URL: ${signalingUrl}`);
        // e.g., signalingUrl = "https://us-west.mediadance.ai"
        await client.startCall(token, signalingUrl); 
      
        setStatus('Session securely established.');
      }
    } catch (err: unknown) {
    // This only intercepts setup errors (like permission denied)
    const platformError = err instanceof MediaDanceError ? err : new Error(String(err));
    
    // console.error(`──> [Setup Initialization Failed]: ${platformError.code}`);
    setStatus(`Failed to start session: ${platformError.message}`);
  }
};

// Triggers steps 1, 2, and 3 under the hood completely on demand
// client.startCall('room-123-abc');
//   const startCallLoop = async () => {
//     try {
//       // 1. Capture local hardware camera and audio lines
//       // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

//       // AFTER: Upgraded to crisp 720p HD
//       // UPGRADED: Strict High-Definition Hardware Force
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: {
//           // 1. Set explicit minimum boundaries to prevent downscaling
//           width: { min: 1280, ideal: 1920 },
//           height: { min: 720, ideal: 1080 },
//           // 2. Advanced block forces sharp focus on resolution processing
//           advanced: [
//             { width: 1920, height: 1080 },
//             { width: 1280, height: 720 }
//           ],
//           frameRate: { ideal: 30 }
//         }, 
//         audio: true 
//       });

//       localStreamRef.current = stream;
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//       setStatus('Media Captured. Connecting to Signaling...');

//       // 2. Initialize connection to your signaling layer on port 3001
//       const socket = io('http://localhost:3001', {
//         transports: ['websocket'],
//         auth: {
//           tenantID: MOCK_CREDENTIALS.tenantID
//         }
//       });
//       socketRef.current = socket;

//       socket.on('connect', () => {
//         setStatus(`Connected as ${MOCK_CREDENTIALS.role}. Joining isolated room...`);
//         socket.emit('join-room', {
//           roomID: MOCK_CREDENTIALS.roomID,
//           userID: MOCK_CREDENTIALS.userID,
//           role: MOCK_CREDENTIALS.role
//         });
//         setJoined(true);
//       });

//       socket.on('connect_error', (err) => {
//         setStatus(`Auth Rejected: ${err.message}`);
//       });

//       // 3. Handle incoming peer notifications from the isolated block
//       socket.on('peer-joined', async (peer) => {
//         setStatus(`Peer entered channel. Setting up WebRTC link...`);
//         initiatePeerConnection(peer.socketID, true);
//       });

//       socket.on('signal-ice-sdp', async (data) => {
//         if (!peerConnectionRef.current) initiatePeerConnection(data.senderSocketID, false);
        
//         const pc = peerConnectionRef.current!;
        
//         if (data.sdp) {
//           await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//           if (data.sdp.type === 'offer') {
//             const answer = await pc.createAnswer();
//             await pc.setLocalDescription(answer);
//             socket.emit('signal-ice-sdp', { targetSocketID: data.senderSocketID, sdp: answer });
//           }
//         } else if (data.candidate) {
//           await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
//         }
//       });

//       socket.on('peer-left', () => {
//         setStatus('Peer disconnected.');
//         if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
//         if (peerConnectionRef.current) {
//           peerConnectionRef.current.close();
//           peerConnectionRef.current = null;
//         }
//       });

//     } catch (err: any) {
//       console.error(err);
//       setStatus(`Initialization Failed: ${err.message}`);
//     }
//   };

//   const initiatePeerConnection = (targetSocketID: string, isInitiator: boolean) => {
//     const pc = new RTCPeerConnection(rtcConfig);
//     peerConnectionRef.current = pc;

//     // Attach local hardware media tracks to the pipeline
//     localStreamRef.current?.getTracks().forEach(track => {
//       pc.addTrack(track, localStreamRef.current!);
//     });

//     // Capture remote track streaming back from the peer
//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     // Propagate discovered connection pathways up to the signaling layer
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socketRef.current?.emit('signal-ice-sdp', {
//           targetSocketID,
//           candidate: event.candidate
//         });
//       }
//     };

//     // If you are the first one in, create the WebRTC negotiation bridge
//     if (isInitiator) {
//       pc.onnegotiationneeded = async () => {
//         const offer = await pc.createOffer();
//         await pc.setLocalDescription(offer);
//         socketRef.current?.emit('signal-ice-sdp', {
//           targetSocketID,
//           sdp: offer
//         });
//       };
//     }
//   };

    const toggleAudio = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCamOff(!isCamOff);
    }
  };

  // const endCallSession = () => {
  //   // Disconnect from your signaling layer on port 3001
  //   socketRef.current?.disconnect();
    
  //   // Close the WebRTC hardware pipeline
  //   peerConnectionRef.current?.close();
  //   peerConnectionRef.current = null;

  //   // Kill camera and microphone hardware lights
  //   localStreamRef.current?.getTracks().forEach(track => track.stop());
    
  //   // Clean layout frames
  //   if (localVideoRef.current) localVideoRef.current.srcObject = null;
  //   if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    
  //   setJoined(false);
  //   setStatus('Session Terminated. Pipeline Cleared.');
  // };
  return (
  <main className="relative flex flex-col h-screen bg-black text-white font-mono p-6 overflow-hidden">
    {/* Control Header */}
    <div className="z-20 border border-zinc-800 p-4 rounded-xl mb-6 bg-zinc-900/80 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Telehealth Infrastructure Client</h1>
        <p className="text-xs text-zinc-500 mt-1">Tenant context: <span className="text-emerald-400">{MOCK_CREDENTIALS.tenantID}</span></p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <span className="text-xs text-zinc-400 block">Status Node</span>
          <span className="text-xs font-semibold text-zinc-200">{status}</span>
        </div>
        {!joined && (
          <button 
            onClick={handleInitializeSession}
            className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-zinc-200 transition"
          >
            Initialize Session
          </button>
        )}
      </div>
    </div>

    {/* Video Container Layer */}
    <div className="flex-1 relative border border-zinc-800 rounded-2xl bg-zinc-950 overflow-hidden min-h-0">
      
      {/* MAIN VIEW: Remote Pipeline (Fills the entire background container) */}
      <div className="w-full h-full">
        <div className="absolute top-4 left-4 z-10 bg-black/60 px-3 py-1 rounded-md text-[10px] uppercase text-zinc-400 border border-zinc-800 backdrop-blur-sm">
          Remote Pipeline
        </div>
        <video 
          ref={remoteVideoRef} 
          className="w-full h-full object-cover" 
          autoPlay 
          playsInline 
        />
      </div>

      {/* FLOATING PiP VIEW: Local Feed Mirror (Pinned top-right) */}
      <div className="absolute top-4 right-4 z-10 w-40 h-28 sm:w-56 sm:h-36 border border-zinc-800 rounded-xl bg-zinc-950 overflow-hidden shadow-2xl transition-all duration-300">
        <div className="absolute top-2 left-2 z-10 bg-black/60 px-2 py-0.5 rounded text-[8px] uppercase text-zinc-400 border border-zinc-800/50 backdrop-blur-sm">
          Local Feed (Mirror)
        </div>
        <video 
          ref={localVideoRef} 
          className="w-full h-full object-cover transform -scale-x-100" 
          autoPlay 
          playsInline 
          muted 
        />
      </div>
    </div>

    {/* Floating Control Overlay inside Local Video Block */}
    {joined && (
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-zinc-900/90 border border-zinc-800 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-sm z-20">
        {/* Audio Mic Button */}
        <button 
          onClick={toggleAudio}
          className={`p-2.5 rounded-full transition text-xs font-bold ${isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
        >
          {isMuted ? 'UNMUTE MIC' : 'MUTE MIC'}
        </button>

        {/* Video Cam Button */}
        <button 
          onClick={toggleVideo}
          className={`p-2.5 rounded-full transition text-xs font-bold ${isCamOff ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
        >
          {isCamOff ? 'START CAM' : 'STOP CAM'}
        </button>

        <div className="w-px h-4 bg-zinc-800" />

        {/* End Call Button */}
        <button 
          // onClick={endCallSession}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-full transition"
        >
          END SESSION
        </button>
      </div>
    )}
  </main>
  );
}
