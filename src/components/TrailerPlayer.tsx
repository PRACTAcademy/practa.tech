import React from "react";

const VimeoPlayer: React.FC = () => (
    <div style={{
        position: "relative",
        width: "100%",
        paddingBottom: "49.3%",
        height: 0,
        overflow: "hidden"
    }}>
        <iframe
            src="https://player.vimeo.com/video/1081355793?h=22c04f601c&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0
            }}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title="0504 - Beta"
            allowFullScreen
        ></iframe>
    </div>
);

export default VimeoPlayer;