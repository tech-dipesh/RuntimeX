**RuntimeX is a backend-heavy observability platform that monitors how web applications behave internally in real time.**
# Process:
Started a Project With Prisma Setup: 2026/05/17
Start at 2026-05-17

# installing a Prisma on the Project:
with first i install a prism with teh: `pn i prisma -D` 
Then iinitalize dmy prisma project with: pnx prisma init
Now run to migrate of the prisma we can just do: pnx prisma migrate dev --name init

and install the client to use it which is the: pn i @prisma/client

After the long days i'm again trying to do the some sort of progress
with i try to create some basic routes with the very basic setups./




- Content updation on the db:
when i've update a conent i can just a generate a databases with a simply a reet bunx prisma migrate dev --name init_events_schema
 before that just do a bun reset to reset a Content.


 # so i must send a data on the array format that was a bug of my today.

-- Adding a 1 mb limit to the Payload so user dont' send more than that a malicious content.


 SEtup a Basic REdis with a port 6379,, with just track their ip and make a sliding window algorithm to implement a rate limiting



Implemented a Redis with a Rate Limiter just a hard cap of the 40 second just a simple implementation as working on the other things currently hopefuly will improve those.


-- Setup a env configuration with a separate folder if anything missing it'll return exit.


Make a Static forced Routes with types.



-- Implementa a indexing to a Project where we need a frequent access data.





## Implemetn on the Projects:
- On the Projects will have the two routes such as Create new projects whichretur a cryptography unique keys.
  - On the create newe projects the api_key once send to a user will store on the cryptographic encoded format only decode where we've send a same key.
  - Store on the hash format on the db, with send to a user to store them.
- another to see list of the all projects that we've created.


## libraries:
- `crypto` Cryptographically Secure Pseudorandom Number Generator which it use this algoritm to create a random charachater where i'm using a 32 chars.
- `buffer-crc32` For Making a Algorirhtm to use where, based on cspng with crypto, baed on that it'll generate a unique key that only match ifit' match a ofrmat.
- I've also implement a time to leave feature on the project for the Redis plan to integrate and will plan.


## Features:
- As the `Temporal` is not supported by the Prisma i've to use a legacy `Date` class for getting a current time, 
- Using a Bun for the Everything, Package Manger, Test runner and the Runtime for Typescript
- Add the Feature with the Global BatchSchema Validation with it validate and the send the data to it.
- 


- I've also make sure using a alias for the Import a My src of the ngerated contetn