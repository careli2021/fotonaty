import Image from 'next/image';

export default function PruebaPage() {
  const driveImageUrl = "https://drive.google.com/uc?export=download&id=1msToi39sUVjgCQJ3HKwxRxMSS3woUM4w"; // Reemplaza con la URL de tu imagen

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Image
        src={driveImageUrl}
        alt="Imagen de Google Drive"
        width={800} // Ajusta el tamaño según sea necesario
        height={600} // Ajusta el tamaño según sea necesario
        objectFit="contain"
      />
    </div>
  );
}
