import { Letter } from "@/types/letter";

export function changeTileColor(initialBoard : Letter[], lowerBound : number, upperBound : number, reqdWord : string) {
    const newBoard : Letter[] = [...initialBoard];
              for (let i = lowerBound; i < upperBound; i++) {
                newBoard[i].isFlipping = true
                newBoard[i].duration = (i%5)*0.5
                if (!reqdWord.includes(newBoard[i].value.toLowerCase())) {
                  newBoard[i].color = "incorrect";
                } else {
                  if (newBoard[i].value.toLowerCase() == reqdWord[i % 5]) {
                    newBoard[i].color = "correct";
                  } else {
                    newBoard[i].color = "wrong-position";
                  }
                }
              }
    return newBoard;
}
export function changeKeyColor(newBoard : Letter[], lowerBound : number, upperBound : number, reqdWord : string, present : Set<string>, absent: Set<string>) {
  for (let i = lowerBound; i < upperBound; i++) {
    if (!reqdWord.includes(newBoard[i].value.toLowerCase())) {
      absent.add(newBoard[i].value)
    } else {
      present.add(newBoard[i].value)
    }
  }
  return [present, absent]
}