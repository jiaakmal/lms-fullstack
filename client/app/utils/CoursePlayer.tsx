import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Props = {
    videoUrl: string;
    title: string;
}

const CoursePlayer = ({ videoUrl, title }: Props) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: ""
    })

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}getVdoCipherOTP`, {
            videoId: videoUrl,
        }).then((res) => {
            setVideoData(res.data)
        })


    }, [videoUrl])

    return (
        <div style={{ paddingTop: "41%", position: "relative" }}>
            {
                videoData.otp && videoData.playbackInfo !== "" && (
                    <iframe src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=lJzDYwCfIM4aEnrx`}
                        style={{ border: 0, maxWidth: "100%", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                        allowFullScreen={true}
                        allow="encrypted-media">
                    </iframe>
                )
            }

        </div>
    )
}

export default CoursePlayer