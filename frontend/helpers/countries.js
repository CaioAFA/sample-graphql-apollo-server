export const compareCountryNames = (search, countryFullName) => {
  search = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  countryFullName = countryFullName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  return countryFullName.includes(search);
}

export const getAllCountriesList = () => {
  return [
    "Abecásia",
    "Afeganistão",
    "África do Sul",
    "Albânia",
    "Alemanha",
    "Andorra",
    "Angola",
    "Antígua e Barbuda",
    "Arábia Saudita",
    "Argélia",
    "Argentina",
    "Armênia",
    "Austrália",
    "Áustria",
    "Azerbaijão",
    "Bahamas",
    "Bahrein",
    "Bangladesh",
    "Barbados",
    "Bélgica",
    "Belize",
    "Benim",
    "Bielorrússia",
    "Bolívia",
    "Bósnia e Herzegovina",
    "Botswana",
    "Brasil",
    "Brunei",
    "Bulgária",
    "Burkina Faso",
    "Burundi",
    "Butão",
    "Cabo Verde",
    "Camarões",
    "Camboja",
    "Canadá",
    "Catar",
    "Cazaquistão",
    "Chade",
    "Chile",
    "China",
    "Chipre",
    "Cingapura",
    "Colômbia",
    "Comores",
    "Congo",
    "Coreia do Norte",
    "Coreia do Sul",
    "Costa do Marfim",
    "Costa Rica",
    "Croácia",
    "Cuba",
    "Dinamarca",
    "Djibouti",
    "Dominica",
    "Egito",
    "El Salvador",
    "Emirados Árabes Unidos",
    "Equador",
    "Eritreia",
    "Escócia",
    "Eslováquia",
    "Eslovênia",
    "Espanha",
    "Estados Federados da Micronésia",
    "Estados Unidos da América",
    "Estônia",
    "Eswatini",
    "Etiópia",
    "Fiji",
    "Filipinas",
    "Finlândia",
    "França",
    "Gabão",
    "Gâmbia",
    "Gana",
    "Geórgia",
    "Granada",
    "Grécia",
    "Guatemala",
    "Guiana",
    "Guiné",
    "Guiné-Bissau",
    "Guiné Equatorial",
    "Haiti",
    "Holanda",
    "Honduras",
    "Hungria",
    "Iêmen",
    "Índia",
    "Indonésia",
    "Inglaterra",
    "Irã",
    "Iraque",
    "Irlanda do Norte",
    "Irlanda",
    "Islândia",
    "Israel",
    "Itália",
    "Jamaica",
    "Japão",
    "Jordânia",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Laos",
    "Lesoto",
    "Letônia",
    "Líbano",
    "Libéria",
    "Líbia",
    "Liechtenstein",
    "Lituânia",
    "Luxemburgo",
    "Macedônia do Norte",
    "Madagascar",
    "Malásia",
    "Malawi",
    "Maldivas",
    "Mali",
    "Malta",
    "Marrocos",
    "Marshall",
    "Maurícia",
    "Mauritânia",
    "México",
    "Mianmar",
    "Micronésia",
    "Moçambique",
    "Moldávia",
    "Mônaco",
    "Mongólia",
    "Montenegro",
    "Namíbia",
    "Nauru",
    "Nepal",
    "Nicarágua:",
    "Níger",
    "Nigéria",
    "Noruega",
    "Nova Zelândia",
    "Omã",
    "Ossétia do Sul",
    "País de Gales",
    "Palau",
    "Palestina",
    "Panamá",
    "Papua-Nova Guiné",
    "Paquistão",
    "Paraguai",
    "Peru",
    "Polônia",
    "Portugal",
    "Qatar",
    "Quênia",
    "Quirguistão",
    "Quiribati",
    "Reino Unido",
    "República Árabe Saaraui Democrática",
    "República Centro-Africana",
    "República Democrática do Congo",
    "República do Congo",
    "República Dominicana",
    "República Tcheca",
    "República Turca de Chipre do Norte",
    "Romênia",
    "Ruanda",
    "Rússia",
    "Salomão",
    "Samoa",
    "San Marino",
    "Santa Lúcia",
    "São Cristóvão e Névis",
    "São Tomé e Príncipe",
    "São Vicente e Granadinas",
    "Senegal",
    "Serra Leoa",
    "Sérvia",
    "Seychelles",
    "Singapura",
    "Síria",
    "Somália",
    "Sri Lanka",
    "Suazilândia",
    "Sudão do Sul",
    "Sudão",
    "Suécia",
    "Suíça",
    "Suriname",
    "Tailândia",
    "Taiwan",
    "Tajiquistão",
    "Tanzânia",
    "Tchéquia",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad e Tobago",
    "Tunísia",
    "Turcomenistão",
    "Turquia",
    "Tuvalu",
    "Ucrânia",
    "Uganda",
    "Uruguai",
    "Uzbequistão",
    "Vanuatu",
    "Vaticano",
    "Venezuela",
    "Vietnã",
    "Zâmbia",
    "Zimbábue"
  ];
}