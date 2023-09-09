import Cookies from 'universal-cookie';

const cookies = new Cookies();


export function authHeader(isMultiPart, newToken) {


  try {
    const Token ='AWS1q2w3e4r5t.';// cookies.get('token');
/*

    console.log('----------------------');
    console.log(Token);
    console.log('----------------------');
*/
    if (Token) {

      return {
        'Content-type': 'application/json',
        'authorizationToken': `${Token}`,
      };
    } else {
      return {
        'Content-type': 'application/json',
        'authorizationToken': 'error',
      };
    }
  } catch (error) {
    return {
      'Content-type': 'application/json',
      'authorizationToken': 'error',
    };
  }


}

