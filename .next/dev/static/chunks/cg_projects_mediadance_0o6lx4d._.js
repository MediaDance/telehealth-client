(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/cg_projects/mediadance/telehealth-sdk/dist/utils/EventEmitter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventEmitter",
    ()=>EventEmitter
]);
class EventEmitter {
    listeners = new Map();
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)?.push(callback);
    }
    emit(event, ...args) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach((cb)=>cb(...args));
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cg_projects/mediadance/telehealth-sdk/dist/managers/MediaManager.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MediaManager",
    ()=>MediaManager
]);
class MediaManager {
    localStream = null;
    async captureLocalStream(video = true, audio = true) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video,
                audio
            });
            return this.localStream;
        } catch (error) {
            console.error('SDK MediaManager: Error accessing hardware lines', error);
            throw error;
        }
    }
    getStream() {
        return this.localStream;
    }
    toggleTrack(type, enabled) {
        if (!this.localStream) return;
        const tracks = type === 'video' ? this.localStream.getVideoTracks() : this.localStream.getAudioTracks();
        tracks.forEach((track)=>track.enabled = enabled);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cg_projects/mediadance/telehealth-sdk/dist/managers/SignalingManager.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignalingManager",
    ()=>SignalingManager
]);
// telehealth-sdk/src/managers/SignalingManager.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-sdk/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$utils$2f$EventEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-sdk/dist/utils/EventEmitter.js [app-client] (ecmascript)");
;
;
class SignalingManager extends __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$utils$2f$EventEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"] {
    serverUrl;
    socket = null;
    constructor(serverUrl){
        super();
        this.serverUrl = serverUrl;
    }
    connect(tenantId) {
        return new Promise((resolve, reject)=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (this.socket?.connected) return resolve(this.socket.id || '');
            this.socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(this.serverUrl, {
                transports: [
                    'websocket'
                ],
                autoConnect: true,
                auth: {
                    tenantID: tenantId || 'tenant_zenspace_prod_01'
                }
            });
            this.setupListeners();
            // Resolve the promise explicitly once the server welcomes us through the guardrail
            this.socket.on('connect', ()=>{
                console.log('[SDK Signaling] Connected with ID:', this.socket?.id);
                resolve(this.socket?.id || '');
            });
            // Catch immediate handshake rejections or errors
            this.socket.on('connect_error', (error)=>{
                console.error('[SDK Signaling] Handshake connection error:', error);
                reject(error);
            });
        });
    }
    // telehealth-sdk/src/managers/SignalingManager.ts
    setupListeners() {
        if (!this.socket) return;
        this.socket.on('connect', ()=>this.emit('connected', this.socket?.id));
        this.socket.on('disconnect', (reason)=>this.emit('disconnected', reason));
        // Pass the exact event straight from the server socket out to the orchestrator layer
        this.socket.on('peer-joined', (data)=>this.emit('peer-joined', data));
        this.socket.on('peer-notification', (data)=>this.emit('peer-notification', data));
        this.socket.on('ice-candidate', (data)=>this.emit('ice-candidate', data));
    }
    emitEvent(event, data) {
        this.socket?.emit(event, data);
    }
    disconnect() {
        this.socket?.disconnect();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cg_projects/mediadance/telehealth-sdk/dist/managers/WebRTCManager.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebRTCManager",
    ()=>WebRTCManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$utils$2f$EventEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-sdk/dist/utils/EventEmitter.js [app-client] (ecmascript)");
;
class WebRTCManager extends __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$utils$2f$EventEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"] {
    iceServers;
    pc = null;
    constructor(iceServers){
        super();
        this.iceServers = iceServers;
    }
    initiateConnection(targetSocketId, localStream) {
        this.pc = new RTCPeerConnection({
            iceServers: this.iceServers
        });
        if (localStream) {
            localStream.getTracks().forEach((track)=>this.pc.addTrack(track, localStream));
        }
        this.pc.onicecandidate = (event)=>{
            if (event.candidate) {
                this.emit('ice-candidate-generated', {
                    target: targetSocketId,
                    candidate: event.candidate
                });
            }
        };
        this.pc.ontrack = (event)=>{
            if (event.streams && event.streams[0]) {
                this.emit('remote-stream-ready', event.streams[0]);
            }
        };
        return this.pc;
    }
    getPeerConnection() {
        return this.pc;
    }
    // telehealth-sdk/src/managers/WebRTCManager.ts
    /**
     * Processes incoming Session Descriptions (Offers/Answers) from a remote peer
     */ async handleRemoteDescription(targetSocketId, sdp, localStream) {
        // If a connection doesn't exist yet for this peer, initialize it as the receiver (isInitiator = false)
        if (!this.pc) {
            this.initiateConnection(targetSocketId, localStream);
        }
        // 1. Set the remote party's details as our current network target
        await this.pc.setRemoteDescription(new RTCSessionDescription(sdp));
        // 2. If it's an offer, we must automatically generate an answer to send back
        if (sdp.type === 'offer') {
            const answer = await this.pc.createAnswer();
            await this.pc.setLocalDescription(answer);
            return answer; // Return the answer so the orchestrator can emit it via socket
        }
        return null;
    }
    /**
     * Appends an incoming network routing candidate to the live pipeline
     */ async handleRemoteIceCandidate(candidate) {
        if (this.pc) {
            await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
            console.log('Successfully appended remote ICE candidate.');
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cg_projects/mediadance/telehealth-sdk/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MediaDanceClient",
    ()=>MediaDanceClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$utils$2f$EventEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-sdk/dist/utils/EventEmitter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$managers$2f$MediaManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-sdk/dist/managers/MediaManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$managers$2f$SignalingManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-sdk/dist/managers/SignalingManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$managers$2f$WebRTCManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-sdk/dist/managers/WebRTCManager.js [app-client] (ecmascript)");
;
;
;
;
class MediaDanceClient extends __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$utils$2f$EventEmitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"] {
    media;
    signaling;
    rtc;
    constructor(config = {}){
        super();
        const serverUrl = config.serverUrl || 'http://localhost:3001';
        // const serverUrl = config.serverUrl || 'https://api.mediadance.live';
        const iceServers = config.iceServers || [
            {
                urls: 'stun:stun.l.google.com:19302'
            }
        ];
        // Instantiate sub-modules cleanly
        this.media = new __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$managers$2f$MediaManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaManager"]();
        this.signaling = new __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$managers$2f$SignalingManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignalingManager"](serverUrl);
        this.rtc = new __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$managers$2f$WebRTCManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebRTCManager"](iceServers);
        this.orchestrateEvents();
    }
    /**
     * Links internal module events together and prepares messages to bubble up to the UI
     */ // telehealth-sdk/src/index.ts
    orchestrateEvents() {
        // Forward remote stream discovery straight out to the NextJS UI layer
        this.rtc.on('remote-stream-ready', (stream)=>this.emit('remote-stream-ready', stream));
        // Handle when internal WebRTC generates an ICE candidate, route it automatically to signaling
        this.rtc.on('ice-candidate-generated', (data)=>{
            this.signaling.emitEvent('signal-ice-sdp', {
                targetSocketID: data.target,
                candidate: data.candidate
            });
        });
        // ---------------------------------------------------------------
        // SIGNALING TRIGGER LOOP
        // ---------------------------------------------------------------
        // Listen for when the server reports a new peer entered our isolated room block
        // this.signaling.on('peer-connected', async (data: { socketId: string }) => {
        //   this.emit('status-update', 'New remote peer detected. Initiating handshake...');
        //   // USER A automatically invokes createCallOffer here!
        //   await this.createCallOffer(data.socketId);
        // });
        // Handle incoming SDP negotiation exchanges (Offers, Answers, and ICE candidates)
        this.signaling.on('peer-notification', async (data)=>{
            this.emit('status-update', 'Incoming peer handshake detected...');
            try {
                // Case A: Remote peer sent an SDP offer or answer
                if (data.sdp) {
                    const localStream = this.media.getStream();
                    const localAnswer = await this.rtc.handleRemoteDescription(data.senderSocketID, data.sdp, localStream);
                    // If we generated an answer, pass it immediately back to the signaling server
                    if (localAnswer) {
                        this.signaling.emitEvent('signal-ice-sdp', {
                            targetSocketID: data.senderSocketID,
                            sdp: localAnswer
                        });
                        this.emit('status-update', 'SDP Answer dispatched to peer.');
                    } else {
                        this.emit('status-update', 'Handshake completed. Connection active.');
                    }
                } else if (data.candidate) {
                    await this.rtc.handleRemoteIceCandidate(data.candidate);
                }
            } catch (error) {
                console.error('SDK Handshake Error:', error);
                this.emit('error', error);
            }
        });
        // Inside telehealth-sdk/src/index.ts -> orchestrateEvents()
        // Catch 'peer-joined' from the server, and kick off the WebRTC offer pipeline!
        this.signaling.on('peer-joined', async (data)=>{
            this.emit('status-update', `Peer ${data.userID} detected. Initiating WebRTC Handshake...`);
            // Use the socketID sent by the server to target the connection offer
            await this.createCallOffer(data.socketID);
        });
    }
    /**
     * The single, high-velocity entry-point for apps like ZenSpace
     */ // public async startCall(roomId: string): Promise<MediaStream> {
    //   if (typeof window === 'undefined') {
    //     throw new Error('startCall can only be executed in browser contexts.');
    //   }
    //   // Step 1: Capture Hardware Video/Audio
    //   const localStream = await this.media.captureLocalStream();
    //   this.emit('local-stream-ready', localStream);
    //   // Step 2: Establish connection to signaling layer
    //   this.signaling.connect();
    //   // Step 3: Trigger the room join routing sequence
    //   this.signaling.emitEvent('join-room', { roomId });
    //   return localStream;
    // }
    // telehealth-sdk/src/index.ts
    // telehealth-sdk/src/index.ts
    // telehealth-sdk/src/index.ts
    async startCall(roomId, tenantId) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            // 1. Capture local browser hardware
            const localStream = await this.media.captureLocalStream();
            this.emit('local-stream-ready', localStream);
            this.emit('status-update', 'Hardware audio/video tracks acquired.');
            // 2. AWAIT the connection link to stabilize over port 3001
            this.emit('status-update', 'Authenticating with infrastructure...');
            await this.signaling.connect(tenantId);
            // 3. Now that the pipe is certified open, safely drop the room allocation payload
            const mockUserId = `user_${Math.random().toString(36).substring(2, 7)}`;
            this.signaling.emitEvent('join-room', {
                roomID: roomId,
                userID: mockUserId,
                role: 'clinician'
            });
            this.emit('status-update', 'Room allocation locked. Awaiting peer...');
            return localStream;
        } catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    /**
     * Generates and transmits an initial WebRTC offer to a newly joined peer.
     * This is invoked by the initiator of the call sequence.
     */ async createCallOffer(targetSocketId) {
        try {
            this.emit('status-update', 'Initializing peer connection pipeline...');
            // 1. Tell WebRTCManager to spin up the RTCPeerConnection instance
            const localStream = this.media.getStream();
            const pc = this.rtc.initiateConnection(targetSocketId, localStream);
            // 2. Generate the SDP Offer
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            // 3. Dispatch the offer to the backend signaling layer over port 3001
            this.signaling.emitEvent('signal-ice-sdp', {
                targetSocketID: targetSocketId,
                sdp: offer
            });
            this.emit('status-update', 'Outgoing WebRTC connection offer transmitted.');
        } catch (error) {
            console.error('SDK failed to generate call offer:', error);
            this.emit('error', error);
        }
    }
    // Easy abstraction cleanups
    muteAudio(isMuted) {
        this.media.toggleTrack('audio', !isMuted);
    }
    muteVideo(isMuted) {
        this.media.toggleTrack('video', !isMuted);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/cg_projects/mediadance/telehealth-client/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TelehealthClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-sdk/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Mock credentials matching your backend validation setup
const MOCK_CREDENTIALS = {
    tenantID: 'tenant_zenspace_prod_01',
    roomID: 'sandbox-room-1',
    userID: `user_${Math.random().toString(36).substring(7)}`,
    role: 'clinician'
};
function TelehealthClient() {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Disconnected');
    const [joined, setJoined] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCamOff, setIsCamOff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const peerConnectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const localVideoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const remoteVideoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const localStreamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Configuration for NAT traversal over local network testing
    const rtcConfig = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302'
            }
        ]
    };
    // Inside your Next.js Page Component
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TelehealthClient.useMemo[client]": ()=>{
            return new __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaDanceClient"]({
                serverUrl: 'http://localhost:3001' // Points directly to your local infra server
            });
        }
    }["TelehealthClient.useMemo[client]"], []);
    // Basic React state to track room text or dynamic entry ids
    // const [status, setStatus] = useState('Idle');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TelehealthClient.useEffect": ()=>{
            // Wire up event listeners as soon as the component mounts
            client.on('local-stream-ready', {
                "TelehealthClient.useEffect": (stream)=>{
                    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
                }
            }["TelehealthClient.useEffect"]);
            client.on('remote-stream-ready', {
                "TelehealthClient.useEffect": (stream)=>{
                    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
                }
            }["TelehealthClient.useEffect"]);
            client.on('status-update', {
                "TelehealthClient.useEffect": (msg)=>{
                    setStatus(msg);
                }
            }["TelehealthClient.useEffect"]);
            client.on('error', {
                "TelehealthClient.useEffect": (err)=>{
                    setStatus(`Error: ${err.message}`);
                }
            }["TelehealthClient.useEffect"]);
            return ({
                "TelehealthClient.useEffect": ()=>{
                // Optional cleanup: client.disconnect();
                }
            })["TelehealthClient.useEffect"];
        }
    }["TelehealthClient.useEffect"], [
        client,
        setStatus
    ]);
    // THE BUTTON CLICK HANDLER
    const handleInitializeSession = async ()=>{
        try {
            setStatus('Connecting to infrastructure session...');
            // Pass both the room name and your valid tenant context string
            await client.startCall('sandbox-room-101', 'tenant_zenspace_prod_01');
        } catch (err) {
            setStatus(`Failed to start session: ${err.message}`);
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
    const toggleAudio = ()=>{
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks().forEach((track)=>{
                track.enabled = !track.enabled;
            });
            setIsMuted(!isMuted);
        }
    };
    const toggleVideo = ()=>{
        if (localStreamRef.current) {
            localStreamRef.current.getVideoTracks().forEach((track)=>{
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex flex-col h-screen bg-black text-white font-mono p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-zinc-800 p-4 rounded-xl mb-6 bg-zinc-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-sm font-bold text-zinc-400 uppercase tracking-wider",
                                children: "Telehealth Infrastructure Client"
                            }, void 0, false, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-zinc-500 mt-1",
                                children: [
                                    "Tenant context: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-400",
                                        children: MOCK_CREDENTIALS.tenantID
                                    }, void 0, false, {
                                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                        lineNumber: 245,
                                        columnNumber: 69
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-zinc-400 block",
                                        children: "Status Node"
                                    }, void 0, false, {
                                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold text-zinc-200",
                                        children: status
                                    }, void 0, false, {
                                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            !joined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleInitializeSession,
                                className: "bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-zinc-200 transition",
                                children: "Initialize Session"
                            }, void 0, false, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 253,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative border border-zinc-800 rounded-2xl bg-zinc-950 overflow-hidden group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-4 left-4 z-10 bg-black/60 px-3 py-1 rounded-md text-[10px] uppercase text-zinc-400 border border-zinc-800",
                                children: "Local Feed (Mirror)"
                            }, void 0, false, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                ref: localVideoRef,
                                className: "w-full h-full object-cover transform -scale-x-100",
                                autoPlay: true,
                                playsInline: true,
                                muted: true
                            }, void 0, false, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative border border-zinc-800 rounded-2xl bg-zinc-950 overflow-hidden group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-4 left-4 z-10 bg-black/60 px-3 py-1 rounded-md text-[10px] uppercase text-zinc-400 border border-zinc-800",
                                children: "Remote Pipeline"
                            }, void 0, false, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 281,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                ref: remoteVideoRef,
                                className: "w-full h-full object-cover",
                                autoPlay: true,
                                playsInline: true
                            }, void 0, false, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                lineNumber: 264,
                columnNumber: 7
            }, this),
            joined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-zinc-900/90 border border-zinc-800 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-sm z-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleAudio,
                        className: `p-2.5 rounded-full transition text-xs font-bold ${isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`,
                        children: isMuted ? 'UNMUTE MIC' : 'MUTE MIC'
                    }, void 0, false, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 296,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleVideo,
                        className: `p-2.5 rounded-full transition text-xs font-bold ${isCamOff ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`,
                        children: isCamOff ? 'START CAM' : 'STOP CAM'
                    }, void 0, false, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 304,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-4 bg-zinc-800"
                    }, void 0, false, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 311,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        // onClick={endCallSession}
                        className: "bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-full transition",
                        children: "END SESSION"
                    }, void 0, false, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 314,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                lineNumber: 294,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, this);
}
_s(TelehealthClient, "es+jV6RQnvIFI/g97Utp4gxjV8E=");
_c = TelehealthClient;
var _c;
__turbopack_context__.k.register(_c, "TelehealthClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=cg_projects_mediadance_0o6lx4d._.js.map