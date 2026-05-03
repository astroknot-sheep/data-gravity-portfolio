import developerPhoto from "@/assets/developer-photo.png";

export default function SpeedLinesBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <img
        src={developerPhoto}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
    </div>
  );
}
