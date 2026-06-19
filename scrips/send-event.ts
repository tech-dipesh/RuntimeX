const URL:String="http://localhost:3000"
const THEENDPOINT="/api/v1/events"
const sessionid1="b56bf7c7-20ee-437c-94f7-3e32b17262c2"
let i=0;

const randWord = Math.floor(Math.random() * 4);
const allType=["api-call", "page-view", "render", "click"]
  const allEvent=[
  {
    "id": i++,
    "sessionid": sessionid1,
    "type": allType[randWord],
    "currenttimestamp"=Temporal.Now.instant()
  },
]

