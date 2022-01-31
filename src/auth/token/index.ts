import bcrypt from "bcrypt";
import { redisClient } from "../../config/redis";

const passwordToGenerateToken = process.env.BCRYPT_TOKEN_PASSWORD || '@dev';

async function initToken() {
  const redis_token1 = await redisClient.get("Effie:token1").catch(function (err) { console.log(err.message); });
  const redis_token2 = await redisClient.get("Effie:token2").catch(function (err) { console.log(err.message); });

  if(!redis_token1) renewToken('Effie:token1');
  if(!redis_token2) renewToken('Effie:token2');
};

async function renewToken(target: string | string[]) {
  if (!target) return false;
  try {
    var expireIn = 60 * 60 * 24;

    if (Array.isArray(target)) {
      return await target.forEach(async (target, index) => {

        if(target == 'Effie:token2') expireIn = expireIn*2

        const tokenHash = bcrypt.hashSync(passwordToGenerateToken, 10);
        expireIn = expireIn + index; //to avoid the same token to expire in the same time
        return await redisClient.set(
          target,
          tokenHash,
          "EX",
          expireIn,
          function (Error: any, Entry: any) {
            if (Error) {
              return false;
            }
            if (Entry) {
              return true;
            }
          }
        );
      });
    }

    if (!Array.isArray(target) || target?.length > 0) {
      const tokenHash = bcrypt.hashSync(passwordToGenerateToken, 10);

      if(target == 'Effie:token2') expireIn = expireIn*2;
      
      return await redisClient.set(
        target,
        tokenHash,
        "EX",
        expireIn,
        function (Error: any, Entry: any) {
          if (Error) {
            return false;
          }
          if (Entry) {
            return true;
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function tokenAuthenticate(req: any, res: any, next: any) {
  //console.log("sasss", req.body);
  //console.log("sasss headers", req.header("token"));

  const token1 = req.header("token1");
  const token2 = req.header("token2");

  if (!token1 && !token2) return res.status(401).send({ error: "No token provided" });

  const redis_token1 = await redisClient.get("Effie:token1").catch(function (err) { console.log(err.message); });
  const redis_token2 = await redisClient.get("Effie:token2").catch(function (err) { console.log(err.message); });
  const redis_token1_ttl = await redisClient.ttl("Effie:token1"); //ttl means time to live
  const redis_token2_ttl = await redisClient.ttl("Effie:token2"); //ttl means time to live
  

  var valid_token = false;
  
  //O token enviado é um token existente?
    if (redis_token1 == token1 || !redis_token1) {
        //O token existente está expirado? renewToken
        if (redis_token1_ttl < 3600 || !redis_token1_ttl) {
            const result = await renewToken("Effie:token1");
            if (result) {
                console.log("Renovou o token1", result);
            }
        }
        if (bcrypt.compareSync(passwordToGenerateToken, token1)) {
                valid_token = true; //Pass true!
        }
    }
    
    //O token enviado é um token existente?
    if(redis_token2 == token2 || !redis_token2){
            //O token existente está expirado? renewToken
        if (redis_token2_ttl < 3600 || !redis_token2_ttl) {
            const result = await renewToken("Effie:token2");
                if (result) {
                    console.log("Renovou o token2", result);
                }
        }
        if (bcrypt.compareSync(passwordToGenerateToken, token2)) {
                valid_token = true; //Pass true!
        }
    }
   
  if (valid_token) {
    next();
  } else {
    return res.status(401).send({ error: "No valid token provided" });
  }
}

export { initToken, tokenAuthenticate };
