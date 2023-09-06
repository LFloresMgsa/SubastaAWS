// module.exports = {
//     domains: ['galponlegado.com', 'galponlegado.pe'],
//     getCurrentDomain: function() {
//       const currentUrl = process.env.CURRENT_URL || ''; // Obtén el dominio desde una variable de entorno
//       for (const domain of this.domains) {
//         if (currentUrl.includes(domain)) {
//           return domain;
//         }
//       }
//       return this.domains[0];
//     }
//   };