import crc32 from "buffer-crc32";
import {randomBytes} from "crypto"
const generateApiKey = () => {
  const secret_key = `sk_live`;
  const secureToken = randomBytes(32).toString('hex');
  const buf = Buffer.from(secureToken);
  const resultBuffer = crc32(buf); 
  console.log(resultBuffer); 
  const converString=resultBuffer.toString('hex').toUpperCase()
  const addAll=`${secret_key}_${secureToken}_${converString}`
  return addAll;
}

export default generateApiKey;