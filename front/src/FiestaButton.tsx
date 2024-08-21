// FiestaButton.tsx
import * as React from 'react';
import clsx from "clsx";
import {Button} from "@mui/material";

interface FiestaButtonProps {
    partyMode: boolean;
    setPartyMode: (partyMode: boolean) => void;
}

const FiestaButton: React.FC<FiestaButtonProps> = ({ partyMode, setPartyMode }) => {
    return (
        <div className={clsx("relative inline-block w-full py-3 modgp", { "animate-magic-sparkle": partyMode })}>
            <div className="relative">
                    <Button variant="outlined"
                            onClick={() => setPartyMode(!partyMode)}>
                        PartyMode {partyMode ? "🎉" : "🎈"}
                    </Button>

            </div>
        </div>
    );
}

export default FiestaButton;