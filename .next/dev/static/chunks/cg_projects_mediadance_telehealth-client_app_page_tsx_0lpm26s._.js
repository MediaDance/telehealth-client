(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/cg_projects/mediadance/telehealth-client/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TelehealthClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/cg_projects/mediadance/telehealth-client/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
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
    const startCallLoop = async ()=>{
        try {
            // 1. Capture local hardware camera and audio lines
            // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            // AFTER: Upgraded to crisp 720p HD
            // UPGRADED: Strict High-Definition Hardware Force
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    // 1. Set explicit minimum boundaries to prevent downscaling
                    width: {
                        min: 1280,
                        ideal: 1920
                    },
                    height: {
                        min: 720,
                        ideal: 1080
                    },
                    // 2. Advanced block forces sharp focus on resolution processing
                    advanced: [
                        {
                            width: 1920,
                            height: 1080
                        },
                        {
                            width: 1280,
                            height: 720
                        }
                    ],
                    frameRate: {
                        ideal: 30
                    }
                },
                audio: true
            });
            localStreamRef.current = stream;
            if (localVideoRef.current) localVideoRef.current.srcObject = stream;
            setStatus('Media Captured. Connecting to Signaling...');
            // 2. Initialize connection to your signaling layer on port 3001
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])('http://localhost:3001', {
                transports: [
                    'websocket'
                ],
                auth: {
                    tenantID: MOCK_CREDENTIALS.tenantID
                }
            });
            socketRef.current = socket;
            socket.on('connect', ()=>{
                setStatus(`Connected as ${MOCK_CREDENTIALS.role}. Joining isolated room...`);
                socket.emit('join-room', {
                    roomID: MOCK_CREDENTIALS.roomID,
                    userID: MOCK_CREDENTIALS.userID,
                    role: MOCK_CREDENTIALS.role
                });
                setJoined(true);
            });
            socket.on('connect_error', (err)=>{
                setStatus(`Auth Rejected: ${err.message}`);
            });
            // 3. Handle incoming peer notifications from the isolated block
            socket.on('peer-joined', async (peer)=>{
                setStatus(`Peer entered channel. Setting up WebRTC link...`);
                initiatePeerConnection(peer.socketID, true);
            });
            socket.on('signal-ice-sdp', async (data)=>{
                if (!peerConnectionRef.current) initiatePeerConnection(data.senderSocketID, false);
                const pc = peerConnectionRef.current;
                if (data.sdp) {
                    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
                    if (data.sdp.type === 'offer') {
                        const answer = await pc.createAnswer();
                        await pc.setLocalDescription(answer);
                        socket.emit('signal-ice-sdp', {
                            targetSocketID: data.senderSocketID,
                            sdp: answer
                        });
                    }
                } else if (data.candidate) {
                    await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
                }
            });
            socket.on('peer-left', ()=>{
                setStatus('Peer disconnected.');
                if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
                if (peerConnectionRef.current) {
                    peerConnectionRef.current.close();
                    peerConnectionRef.current = null;
                }
            });
        } catch (err) {
            console.error(err);
            setStatus(`Initialization Failed: ${err.message}`);
        }
    };
    const initiatePeerConnection = (targetSocketID, isInitiator)=>{
        const pc = new RTCPeerConnection(rtcConfig);
        peerConnectionRef.current = pc;
        // Attach local hardware media tracks to the pipeline
        localStreamRef.current?.getTracks().forEach((track)=>{
            pc.addTrack(track, localStreamRef.current);
        });
        // Capture remote track streaming back from the peer
        pc.ontrack = (event)=>{
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };
        // Propagate discovered connection pathways up to the signaling layer
        pc.onicecandidate = (event)=>{
            if (event.candidate) {
                socketRef.current?.emit('signal-ice-sdp', {
                    targetSocketID,
                    candidate: event.candidate
                });
            }
        };
        // If you are the first one in, create the WebRTC negotiation bridge
        if (isInitiator) {
            pc.onnegotiationneeded = async ()=>{
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                socketRef.current?.emit('signal-ice-sdp', {
                    targetSocketID,
                    sdp: offer
                });
            };
        }
    };
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
    const endCallSession = ()=>{
        // Disconnect from your signaling layer on port 3001
        socketRef.current?.disconnect();
        // Close the WebRTC hardware pipeline
        peerConnectionRef.current?.close();
        peerConnectionRef.current = null;
        // Kill camera and microphone hardware lights
        localStreamRef.current?.getTracks().forEach((track)=>track.stop());
        // Clean layout frames
        if (localVideoRef.current) localVideoRef.current.srcObject = null;
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
        setJoined(false);
        setStatus('Session Terminated. Pipeline Cleared.');
    };
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
                                lineNumber: 200,
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
                                        lineNumber: 201,
                                        columnNumber: 69
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 199,
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
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold text-zinc-200",
                                        children: status
                                    }, void 0, false, {
                                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this),
                            !joined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: startCallLoop,
                                className: "bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-zinc-200 transition",
                                children: "Initialize Session"
                            }, void 0, false, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                lineNumber: 198,
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
                                lineNumber: 223,
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
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 222,
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
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                ref: remoteVideoRef,
                                className: "w-full h-full object-cover",
                                autoPlay: true,
                                playsInline: true
                            }, void 0, false, {
                                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                lineNumber: 220,
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
                        lineNumber: 252,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleVideo,
                        className: `p-2.5 rounded-full transition text-xs font-bold ${isCamOff ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`,
                        children: isCamOff ? 'START CAM' : 'STOP CAM'
                    }, void 0, false, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-4 bg-zinc-800"
                    }, void 0, false, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cg_projects$2f$mediadance$2f$telehealth$2d$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: endCallSession,
                        className: "bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-full transition",
                        children: "END SESSION"
                    }, void 0, false, {
                        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                        lineNumber: 270,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
                lineNumber: 250,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cg_projects/mediadance/telehealth-client/app/page.tsx",
        lineNumber: 196,
        columnNumber: 5
    }, this);
}
_s(TelehealthClient, "Xicpxl5Ig/xj9ycWf/JVRS0JrP4=");
_c = TelehealthClient;
var _c;
__turbopack_context__.k.register(_c, "TelehealthClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=cg_projects_mediadance_telehealth-client_app_page_tsx_0lpm26s._.js.map