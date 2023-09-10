import axios from "axios";

const postAudio = async (content) => {
    await axios.post('https://api.elevenlabs.io/v1/text-to-speech/rRuZh0zB9DvJ3uBFV3Fo', {
        "text": content,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 1,
            "similarity_boost": 0.55,
            "style": 0,
            "use_speaker_boost": true
        }
    }, {
        headers: {
            'accept': 'audio/mpeg',
            'xi-api-key': '9477717510eb5b151218d25be4ff41dd',
            'content-type': 'application/json'
        }
    }).then(function (response) {
        const audioBlob = new Blob([response.data], { type: 'audio/mpeg' }); // Ajusta el tipo de contenido según tu caso
        const audioBlobUrl = URL.createObjectURL(audioBlob);
        return audioBlobUrl
    })
        .catch(function (error) {
            console.log(error);
        });
}

export default postAudio;