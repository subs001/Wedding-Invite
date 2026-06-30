import { useState } from "react";
import Envelope from "./components/Envelope";
import InvitationMain from "./components/InvitationMain";
import { InvitationState } from "./types";

export default function App() {
  const [stage, setStage] = useState<InvitationState>("envelope");

  const handleOpenInvitation = () => {
    setStage("cover");
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <div className="min-h-screen text-sans bg-zinc-950 selection:bg-wedding-peach selection:text-white">
      {stage === "envelope" ? (
        <Envelope onOpen={handleOpenInvitation} />
      ) : (
        <InvitationMain />
      )}
    </div>
  );
}
