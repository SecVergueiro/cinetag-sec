import Banner from "components/Banner";
import Titulo from "components/Titulo";
import { useParams } from "react-router-dom";
import styles from "./Player.module.css";
import NaoEncontrada from "pages/NaoEncontrada";
import { useEffect, useState } from "react";

function Player() {
  const [video, setVideo] = useState(null);
  const parametros = useParams();

  useEffect(() => {
    if (!parametros.id) return;

    fetch(
      `https://my-json-server.typicode.com/SecVergueiro/cinetag-api/videos?id=${parametros.id}`
    )
      .then((resposta) => resposta.json())
      .then((dados) => {
        // dados vem como array (possivelmente vazio). pega o primeiro elemento.
        setVideo(dados[0] || null);
      })
      .catch(() => setVideo(null));
  }, [parametros.id]);

  if (!video) {
    return <NaoEncontrada />;
  }

  return (
    <>
      <Banner imagem="player" />
      <Titulo>
        <h1>Player</h1>
      </Titulo>
      <section className={styles.container}>
        <iframe
          width="100%"
          height="100%"
          src={video.link}
          title={video.titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </section>
    </>
  );
}

export default Player;
