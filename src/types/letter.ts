export interface Letter {
    value: string;
    color: "correct" | "wrong-position" | "incorrect" | "default";
    isFlipping: boolean;
    duration: number;
  }
  