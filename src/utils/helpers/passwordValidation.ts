export default function validatePassword(pass: string) {
  if(pass.length < 8){
    return true
  }
  return false;
}