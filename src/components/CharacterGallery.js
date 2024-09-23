import CustomImage from "./CustomIamge";
import { motion } from "framer-motion";
import '../styles/CharacterGallery.css';


export default function CharacterGallery() {
  const characters = [
    {
      src: "https://drive.google.com/file/d/1LMiaNX1M42KNBWeHw6W7ZT_G9Buz199_/view?usp=drive_link",
      alt: "Kozo Zentos",
      name: "Kozo Zentos",
    },
    {
      src: "https://drive.google.com/file/d/19ET1uCj7MoO9pET2W3bhWe4rmZb-08Ny/view?usp=drive_link",
      alt: "Shiron",
      name: "Shiron",
    },
    {
      src: "https://drive.google.com/file/d/1JJUZvFBCDKPU8jx2qM_OfgWZC8LYs2Va/view?usp=drive_link",
      alt: "Nichuki",
      name: "Nichuki",
    },
  ];

  return (
    <div className=" my-5">
      <h2 className="text-center mb-4 display-4 text-white">Meet the Characters</h2>
      <div className="row">
        {characters.map((character, index) => (
          <motion.div
            key={index}
            className={`col-md-4 d-flex justify-content-center ${index % 2 === 0 ? 'mt-md-5' : ''}`}
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

