import CustomImage from "./CustomIamge";
import { motion } from "framer-motion";
import '../styles/CharacterGallery.css'; // CSS file for additional styling
import Kozo from '../images/kozo.png';
import Shiron from '../images/shiron.png';
import Nichuki from '../images/nichuki.png';

export default function CharacterGallery() {
  const characters = [
    {
      src: Kozo,
      alt: "Kozo Zentos",
      name: "Kozo Zentos",
    },
    {
      src: Shiron,
      alt: "Shiron",
      name: "Shiron",
    },
    {
      src: Nichuki,
      alt: "Nichuki",
      name: "Nichuki",
    },
  ];

  return (
    <div className="container my-5 gallery-container">
      <h2 className="text-center mb-4 display-4 text-white">Meet the Characters</h2>
      <div className="row justify-content-center">
        {characters.map((character, index) => (
          <motion.div
            key={index}
            className={`col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-5`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="position-relative w-100" style={{ maxWidth: '300px' }}>
              <CustomImage
                src={character.src}
                alt={character.alt}
                layout="fill"
                objectFit="contain"
                className="img-fluid rounded shadow-lg transition-transform"
              />
              <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-gradient bg-dark opacity-0 hover-opacity-75 d-flex align-items-end justify-content-center rounded transition-opacity">
                <h3 className="text-white display-6 mb-4">{character.name}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
