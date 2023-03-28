semantic.emoji = {};

// ready event
semantic.emoji.ready = function() {

  var allFlags =[{
    countrycode: 'af',
    name: 'Afghanistan',
    alias: ''
  }, {
    countrycode: 'ax',
    name: 'Åland Islands',
    alias: ''
  }, {
    countrycode: 'al',
    name: 'Albania',
    alias: ''
  }, {
    countrycode: 'dz',
    name: 'Algeria',
    alias: ''
  }, {
    countrycode: 'as',
    name: 'American Samoa',
    alias: ''
  }, {
    countrycode: 'ad',
    name: 'Andorra',
    alias: ''
  }, {
    countrycode: 'ao',
    name: 'Angola',
    alias: ''
  }, {
    countrycode: 'ai',
    name: 'Anguilla',
    alias: ''
  }, {
    countrycode: 'aq',
    name: 'Antarctica',
    alias: ''
  }, {
    countrycode: 'ag',
    name: 'Antigua & Barbuda',
    alias: 'antigua'
  }, {
    countrycode: 'ar',
    name: 'Argentina',
    alias: ''
  }, {
    countrycode: 'am',
    name: 'Armenia',
    alias: ''
  }, {
    countrycode: 'aw',
    name: 'Aruba',
    alias: ''
  }, {
    countrycode: 'au',
    name: 'Australia',
    alias: ''
  }, {
    countrycode: 'at',
    name: 'Austria',
    alias: ''
  }, {
    countrycode: 'az',
    name: 'Azerbaijan',
    alias: ''
  }, {
    countrycode: 'bs',
    name: 'Bahamas',
    alias: ''
  }, {
    countrycode: 'bh',
    name: 'Bahrain',
    alias: ''
  }, {
    countrycode: 'bd',
    name: 'Bangladesh',
    alias: ''
  }, {
    countrycode: 'bb',
    name: 'Barbados',
    alias: ''
  }, {
    countrycode: 'by',
    name: 'Belarus',
    alias: ''
  }, {
    countrycode: 'be',
    name: 'Belgium',
    alias: ''
  }, {
    countrycode: 'bz',
    name: 'Belize',
    alias: ''
  }, {
    countrycode: 'bj',
    name: 'Benin',
    alias: ''
  }, {
    countrycode: 'bm',
    name: 'Bermuda',
    alias: ''
  }, {
    countrycode: 'bt',
    name: 'Bhutan',
    alias: ''
  }, {
    countrycode: 'bo',
    name: 'Bolivia',
    alias: ''
  }, {
    countrycode: 'ba',
    name: 'Bosnia & Herzegovina',
    alias: ''
  }, {
    countrycode: 'bw',
    name: 'Botswana',
    alias: ''
  }, {
    countrycode: 'br',
    name: 'Brazil',
    alias: ''
  }, {
    countrycode: 'io',
    name: 'British Indian Ocean Territory',
    alias: ''
  }, {
    countrycode: 'vg',
    name: 'British Virgin Islands',
    alias: ''
  }, {
    countrycode: 'bn',
    name: 'Brunei',
    alias: ''
  }, {
    countrycode: 'bg',
    name: 'Bulgaria',
    alias: ''
  }, {
    countrycode: 'bf',
    name: 'Burkina Faso',
    alias: ''
  }, {
    countrycode: 'bi',
    name: 'Burundi',
    alias: ''
  }, {
    countrycode: 'kh',
    name: 'Cambodia',
    alias: ''
  }, {
    countrycode: 'cm',
    name: 'Cameroon',
    alias: ''
  }, {
    countrycode: 'ca',
    name: 'Canada',
    alias: ''
  }, {
    countrycode: 'ic',
    name: 'Canary Islands',
    alias: ''
  }, {
    countrycode: 'cv',
    name: 'Cape Verde',
    alias: ''
  }, {
    countrycode: 'bq',
    name: 'Caribbean Netherlands',
    alias: 'an'
  }, {
    countrycode: 'ky',
    name: 'Cayman Islands',
    alias: ''
  }, {
    countrycode: 'cf',
    name: 'Central African Republic',
    alias: ''
  }, {
    countrycode: 'td',
    name: 'Chad',
    alias: ''
  }, {
    countrycode: 'cl',
    name: 'Chile',
    alias: ''
  }, {
    countrycode: 'cn',
    name: 'China',
    alias: ''
  }, {
    countrycode: 'cx',
    name: 'Christmas Island',
    alias: ''
  }, {
    countrycode: 'cc',
    name: 'Cocos (Keeling) Islands',
    alias: ''
  }, {
    countrycode: 'co',
    name: 'Colombia',
    alias: ''
  }, {
    countrycode: 'km',
    name: 'Comoros',
    alias: ''
  }, {
    countrycode: 'cg',
    name: 'Congo - Brazzaville',
    alias: ''
  }, {
    countrycode: 'cd',
    name: 'Congo - Kinshasa',
    alias: 'congo'
  }, {
    countrycode: 'ck',
    name: 'Cook Islands',
    alias: ''
  }, {
    countrycode: 'cr',
    name: 'Costa Rica',
    alias: ''
  }, {
    countrycode: 'ci',
    name: 'Côte d’Ivoire',
    alias: ''
  }, {
    countrycode: 'hr',
    name: 'Croatia',
    alias: ''
  }, {
    countrycode: 'cu',
    name: 'Cuba',
    alias: ''
  }, {
    countrycode: 'cw',
    name: 'Curaçao',
    alias: ''
  }, {
    countrycode: 'cy',
    name: 'Cyprus',
    alias: ''
  }, {
    countrycode: 'cz',
    name: 'Czechia',
    alias: 'czech_republic'
  }, {
    countrycode: 'dk',
    name: 'Denmark',
    alias: ''
  }, {
    countrycode: 'dj',
    name: 'Djibouti',
    alias: ''
  }, {
    countrycode: 'dm',
    name: 'Dominica',
    alias: ''
  }, {
    countrycode: 'do',
    name: 'Dominican Republic',
    alias: ''
  }, {
    countrycode: 'ec',
    name: 'Ecuador',
    alias: ''
  }, {
    countrycode: 'eg',
    name: 'Egypt',
    alias: ''
  }, {
    countrycode: 'sv',
    name: 'El Salvador',
    alias: ''
  }, {
    countrycode: 'gq',
    name: 'Equatorial Guinea',
    alias: ''
  }, {
    countrycode: 'er',
    name: 'Eritrea',
    alias: ''
  }, {
    countrycode: 'ee',
    name: 'Estonia',
    alias: ''
  }, {
    countrycode: 'et',
    name: 'Ethiopia',
    alias: ''
  }, {
    countrycode: 'eu',
    name: 'European Union',
    alias: ''
  }, {
    countrycode: 'fk',
    name: 'Falkland Islands',
    alias: ''
  }, {
    countrycode: 'fo',
    name: 'Faroe Islands',
    alias: ''
  }, {
    countrycode: 'fj',
    name: 'Fiji',
    alias: ''
  }, {
    countrycode: 'fi',
    name: 'Finland',
    alias: ''
  }, {
    countrycode: 'fr',
    name: 'France',
    alias: ''
  }, {
    countrycode: 'gf',
    name: 'French Guiana',
    alias: ''
  }, {
    countrycode: 'pf',
    name: 'French Polynesia',
    alias: ''
  }, {
    countrycode: 'tf',
    name: 'French Southern Territories',
    alias: 'french_territories'
  }, {
    countrycode: 'ga',
    name: 'Gabon',
    alias: ''
  }, {
    countrycode: 'gm',
    name: 'Gambia',
    alias: ''
  }, {
    countrycode: 'ge',
    name: 'Georgia',
    alias: ''
  }, {
    countrycode: 'de',
    name: 'Germany',
    alias: ''
  }, {
    countrycode: 'gh',
    name: 'Ghana',
    alias: ''
  }, {
    countrycode: 'gi',
    name: 'Gibraltar',
    alias: ''
  }, {
    countrycode: 'gr',
    name: 'Greece',
    alias: ''
  }, {
    countrycode: 'gl',
    name: 'Greenland',
    alias: ''
  }, {
    countrycode: 'gd',
    name: 'Grenada',
    alias: ''
  }, {
    countrycode: 'gp',
    name: 'Guadeloupe',
    alias: ''
  }, {
    countrycode: 'gu',
    name: 'Guam',
    alias: ''
  }, {
    countrycode: 'gt',
    name: 'Guatemala',
    alias: ''
  }, {
    countrycode: 'gg',
    name: 'Guernsey',
    alias: ''
  }, {
    countrycode: 'gn',
    name: 'Guinea',
    alias: ''
  }, {
    countrycode: 'gw',
    name: 'Guinea-Bissau',
    alias: ''
  }, {
    countrycode: 'gy',
    name: 'Guyana',
    alias: ''
  }, {
    countrycode: 'ht',
    name: 'Haiti',
    alias: ''
  }, {
    countrycode: 'hn',
    name: 'Honduras',
    alias: ''
  }, {
    countrycode: 'hk',
    name: 'Hong Kong SAR China',
    alias: 'hong_kong'
  }, {
    countrycode: 'hu',
    name: 'Hungary',
    alias: ''
  }, {
    countrycode: 'is',
    name: 'Iceland',
    alias: ''
  }, {
    countrycode: 'in',
    name: 'India',
    alias: ''
  }, {
    countrycode: 'id',
    name: 'Indonesia',
    alias: ''
  }, {
    countrycode: 'ir',
    name: 'Iran',
    alias: ''
  }, {
    countrycode: 'iq',
    name: 'Iraq',
    alias: ''
  }, {
    countrycode: 'ie',
    name: 'Ireland',
    alias: ''
  }, {
    countrycode: 'im',
    name: 'Isle of Man',
    alias: ''
  }, {
    countrycode: 'il',
    name: 'Israel',
    alias: ''
  }, {
    countrycode: 'it',
    name: 'Italy',
    alias: ''
  }, {
    countrycode: 'jm',
    name: 'Jamaica',
    alias: ''
  }, {
    countrycode: 'jp',
    name: 'Japan',
    alias: ''
  }, {
    countrycode: 'je',
    name: 'Jersey',
    alias: ''
  }, {
    countrycode: 'jo',
    name: 'Jordan',
    alias: ''
  }, {
    countrycode: 'kz',
    name: 'Kazakhstan',
    alias: ''
  }, {
    countrycode: 'ke',
    name: 'Kenya',
    alias: ''
  }, {
    countrycode: 'ki',
    name: 'Kiribati',
    alias: ''
  }, {
    countrycode: 'xk',
    name: 'Kosovo',
    alias: ''
  }, {
    countrycode: 'kw',
    name: 'Kuwait',
    alias: ''
  }, {
    countrycode: 'kg',
    name: 'Kyrgyzstan',
    alias: ''
  }, {
    countrycode: 'la',
    name: 'Laos',
    alias: ''
  }, {
    countrycode: 'lv',
    name: 'Latvia',
    alias: ''
  }, {
    countrycode: 'lb',
    name: 'Lebanon',
    alias: ''
  }, {
    countrycode: 'ls',
    name: 'Lesotho',
    alias: ''
  }, {
    countrycode: 'lr',
    name: 'Liberia',
    alias: ''
  }, {
    countrycode: 'ly',
    name: 'Libya',
    alias: ''
  }, {
    countrycode: 'li',
    name: 'Liechtenstein',
    alias: ''
  }, {
    countrycode: 'lt',
    name: 'Lithuania',
    alias: ''
  }, {
    countrycode: 'lu',
    name: 'Luxembourg',
    alias: ''
  }, {
    countrycode: 'mo',
    name: 'Macao SAR China',
    alias: ''
  }, {
    countrycode: 'mk',
    name: 'Macedonia',
    alias: ''
  }, {
    countrycode: 'mg',
    name: 'Madagascar',
    alias: ''
  }, {
    countrycode: 'mw',
    name: 'Malawi',
    alias: ''
  }, {
    countrycode: 'my',
    name: 'Malaysia',
    alias: ''
  }, {
    countrycode: 'mv',
    name: 'Maldives',
    alias: ''
  }, {
    countrycode: 'ml',
    name: 'Mali',
    alias: ''
  }, {
    countrycode: 'mt',
    name: 'Malta',
    alias: ''
  }, {
    countrycode: 'mh',
    name: 'Marshall Islands',
    alias: ''
  }, {
    countrycode: 'mq',
    name: 'Martinique',
    alias: ''
  }, {
    countrycode: 'mr',
    name: 'Mauritania',
    alias: ''
  }, {
    countrycode: 'mu',
    name: 'Mauritius',
    alias: ''
  }, {
    countrycode: 'yt',
    name: 'Mayotte',
    alias: ''
  }, {
    countrycode: 'mx',
    name: 'Mexico',
    alias: ''
  }, {
    countrycode: 'fm',
    name: 'Micronesia',
    alias: ''
  }, {
    countrycode: 'md',
    name: 'Moldova',
    alias: ''
  }, {
    countrycode: 'mc',
    name: 'Monaco',
    alias: ''
  }, {
    countrycode: 'mn',
    name: 'Mongolia',
    alias: ''
  }, {
    countrycode: 'me',
    name: 'Montenegro',
    alias: ''
  }, {
    countrycode: 'ms',
    name: 'Montserrat',
    alias: ''
  }, {
    countrycode: 'ma',
    name: 'Morocco',
    alias: ''
  }, {
    countrycode: 'mz',
    name: 'Mozambique',
    alias: ''
  }, {
    countrycode: 'mm',
    name: 'Myanmar (Burma)',
    alias: 'burma'
  }, {
    countrycode: 'na',
    name: 'Namibia',
    alias: ''
  }, {
    countrycode: 'nr',
    name: 'Nauru',
    alias: ''
  }, {
    countrycode: 'np',
    name: 'Nepal',
    alias: ''
  }, {
    countrycode: 'nl',
    name: 'Netherlands',
    alias: ''
  }, {
    countrycode: 'nc',
    name: 'New Caledonia',
    alias: ''
  }, {
    countrycode: 'nz',
    name: 'New Zealand',
    alias: ''
  }, {
    countrycode: 'ni',
    name: 'Nicaragua',
    alias: ''
  }, {
    countrycode: 'ne',
    name: 'Niger',
    alias: ''
  }, {
    countrycode: 'ng',
    name: 'Nigeria',
    alias: ''
  }, {
    countrycode: 'nu',
    name: 'Niue',
    alias: ''
  }, {
    countrycode: 'nf',
    name: 'Norfolk Island',
    alias: ''
  }, {
    countrycode: 'kp',
    name: 'North Korea',
    alias: ''
  }, {
    countrycode: 'mp',
    name: 'Northern Mariana Islands',
    alias: ''
  }, {
    countrycode: 'no',
    name: 'Norway',
    alias: ''
  }, {
    countrycode: 'om',
    name: 'Oman',
    alias: ''
  }, {
    countrycode: 'pk',
    name: 'Pakistan',
    alias: ''
  }, {
    countrycode: 'pw',
    name: 'Palau',
    alias: ''
  }, {
    countrycode: 'ps',
    name: 'Palestinian Territories',
    alias: ''
  }, {
    countrycode: 'pa',
    name: 'Panama',
    alias: ''
  }, {
    countrycode: 'pg',
    name: 'Papua New Guinea',
    alias: 'new_guinea'
  }, {
    countrycode: 'py',
    name: 'Paraguay',
    alias: ''
  }, {
    countrycode: 'pe',
    name: 'Peru',
    alias: ''
  }, {
    countrycode: 'ph',
    name: 'Philippines',
    alias: ''
  }, {
    countrycode: 'pn',
    name: 'Pitcairn Islands',
    alias: ''
  }, {
    countrycode: 'pl',
    name: 'Poland',
    alias: ''
  }, {
    countrycode: 'pt',
    name: 'Portugal',
    alias: ''
  }, {
    countrycode: 'pr',
    name: 'Puerto Rico',
    alias: ''
  }, {
    countrycode: 'qa',
    name: 'Qatar',
    alias: ''
  }, {
    countrycode: 're',
    name: 'Réunion',
    alias: ''
  }, {
    countrycode: 'ro',
    name: 'Romania',
    alias: ''
  }, {
    countrycode: 'ru',
    name: 'Russia',
    alias: ''
  }, {
    countrycode: 'rw',
    name: 'Rwanda',
    alias: ''
  }, {
    countrycode: 'ws',
    name: 'Samoa',
    alias: ''
  }, {
    countrycode: 'sm',
    name: 'San Marino',
    alias: ''
  }, {
    countrycode: 'st',
    name: 'São Tomé & Príncipe',
    alias: 'samo_tome'
  }, {
    countrycode: 'sa',
    name: 'Saudi Arabia',
    alias: 'saudiarabia'
  }, {
    countrycode: 'sn',
    name: 'Senegal',
    alias: ''
  }, {
    countrycode: 'rs',
    name: 'Serbia',
    alias: ''
  }, {
    countrycode: 'sc',
    name: 'Seychelles',
    alias: ''
  }, {
    countrycode: 'sl',
    name: 'Sierra Leone',
    alias: ''
  }, {
    countrycode: 'sg',
    name: 'Singapore',
    alias: ''
  }, {
    countrycode: 'sx',
    name: 'Sint Maarten',
    alias: ''
  }, {
    countrycode: 'sk',
    name: 'Slovakia',
    alias: ''
  }, {
    countrycode: 'si',
    name: 'Slovenia',
    alias: ''
  }, {
    countrycode: 'gs',
    name: 'South Georgia & South Sandwich Islands',
    alias: 'sandwich_islands'
  }, {
    countrycode: 'sb',
    name: 'Solomon Islands',
    alias: ''
  }, {
    countrycode: 'so',
    name: 'Somalia',
    alias: ''
  }, {
    countrycode: 'za',
    name: 'South Africa',
    alias: ''
  }, {
    countrycode: 'kr',
    name: 'South Korea',
    alias: ''
  }, {
    countrycode: 'ss',
    name: 'South Sudan',
    alias: ''
  }, {
    countrycode: 'es',
    name: 'Spain',
    alias: ''
  }, {
    countrycode: 'lk',
    name: 'Sri Lanka',
    alias: ''
  }, {
    countrycode: 'bl',
    name: 'St. Barthélemy',
    alias: 'saint_barth'
  }, {
    countrycode: 'sh',
    name: 'St. Helena',
    alias: 'saint_helena'
  }, {
    countrycode: 'kn',
    name: 'St. Kitts & Nevis',
    alias: 'saint_kitts_and_navis'
  }, {
    countrycode: 'lc',
    name: 'St. Lucia',
    alias: 'saint_lucia'
  }, {
    countrycode: 'pm',
    name: 'St. Pierre & Miquelon',
    alias: 'saint_pierre'
  }, {
    countrycode: 'vc',
    name: 'St. Vincent & Grenadines',
    alias: ''
  }, {
    countrycode: 'sd',
    name: 'Sudan',
    alias: ''
  }, {
    countrycode: 'sr',
    name: 'Suriname',
    alias: ''
  }, {
    countrycode: 'sz',
    name: 'Eswatini',
    alias: ''
  }, {
    countrycode: 'se',
    name: 'Sweden',
    alias: ''
  }, {
    countrycode: 'ch',
    name: 'Switzerland',
    alias: ''
  }, {
    countrycode: 'sy',
    name: 'Syria',
    alias: ''
  }, {
    countrycode: 'tw',
    name: 'Taiwan',
    alias: ''
  }, {
    countrycode: 'tj',
    name: 'Tajikistan',
    alias: ''
  }, {
    countrycode: 'tz',
    name: 'Tanzania',
    alias: ''
  }, {
    countrycode: 'th',
    name: 'Thailand',
    alias: ''
  }, {
    countrycode: 'tl',
    name: 'Timor-Leste',
    alias: ''
  }, {
    countrycode: 'tg',
    name: 'Togo',
    alias: ''
  }, {
    countrycode: 'tk',
    name: 'Tokelau',
    alias: ''
  }, {
    countrycode: 'to',
    name: 'Tonga',
    alias: ''
  }, {
    countrycode: 'tt',
    name: 'Trinidad & Tobago',
    alias: ''
  }, {
    countrycode: 'tn',
    name: 'Tunisia',
    alias: ''
  }, {
    countrycode: 'tr',
    name: 'Turkey',
    alias: ''
  }, {
    countrycode: 'tm',
    name: 'Turkmenistan',
    alias: ''
  }, {
    countrycode: 'tc',
    name: 'Turks & Caicos Islands',
    alias: ''
  }, {
    countrycode: 'vi',
    name: 'U.S. Virgin Islands',
    alias: ''
  }, {
    countrycode: 'tv',
    name: 'Tuvalu',
    alias: ''
  }, {
    countrycode: 'ug',
    name: 'Uganda',
    alias: ''
  }, {
    countrycode: 'ua',
    name: 'Ukraine',
    alias: ''
  }, {
    countrycode: 'ae',
    name: 'United Arab Emirates',
    alias: 'uae'
  }, {
    countrycode: 'gb',
    name: 'United Kingdom',
    alias: 'uk'
  }, {
    countrycode: 'gb_eng',
    name: 'England',
    alias: ''
  }, {
    countrycode: 'gb_sct',
    name: 'Scotland',
    alias: ''
  }, {
    countrycode: 'gb_wls',
    name: 'Wales',
    alias: ''
  }, {
    countrycode: 'us',
    name: 'United States',
    alias: 'america'
  }, {
    countrycode: 'uy',
    name: 'Uruguay',
    alias: ''
  }, {
    countrycode: 'uz',
    name: 'Uzbekistan',
    alias: ''
  }, {
    countrycode: 'vu',
    name: 'Vanuatu',
    alias: ''
  }, {
    countrycode: 'va',
    name: 'Vatican City',
    alias: ''
  }, {
    countrycode: 've',
    name: 'Venezuela',
    alias: ''
  }, {
    countrycode: 'vn',
    name: 'Vietnam',
    alias: ''
  }, {
    countrycode: 'wf',
    name: 'Wallis & Futuna',
    alias: ''
  }, {
    countrycode: 'eh',
    name: 'Western Sahara',
    alias: ''
  }, {
    countrycode: 'ye',
    name: 'Yemen',
    alias: ''
  }, {
    countrycode: 'zm',
    name: 'Zambia',
    alias: ''
  }, {
    countrycode: 'zw',
    name: 'Zimbabwe',
    alias: ''
  }, {
    countrycode: 'ac',
    name: 'Ascension Island',
    alias: ''
  }, {
    countrycode: 'bv',
    name: 'Bouvet Island',
    alias: ''
  }, {
    countrycode: 'cp',
    name: 'Clipperton Island',
    alias: ''
  }, {
    countrycode: 'ea',
    name: 'Ceuta & Melilla',
    alias: ''
  }, {
    countrycode: 'dg',
    name: 'Diego Garcia',
    alias: ''
  }, {
    countrycode: 'hm',
    name: 'Heard & McDonald Islands',
    alias: ''
  }, {
    countrycode: 'mf',
    name: 'St. Martin',
    alias: ''
  }, {
    countrycode: 'sj',
    name: 'Svalbard & Jan Mayen',
    alias: 'svalbard'
  }, {
    countrycode: 'ta',
    name: 'Tristan da Cunha',
    alias: ''
  }, {
    countrycode: 'um',
    name: 'U.S. Outlying Islands',
    alias: 'minor_islands'
  }, {
    countrycode: 'un',
    name: 'United Nations',
    alias: ''
  },{
    countrycode: 'rainbow',
    name: 'rainbow flag',
    alias: 'pride_flag'
  }, {
    countrycode: 'transgender',
    name: 'transgender flag',
    alias: ''
  }, {
    countrycode: 'pirate',
    name: 'Pirate Flag',
    alias: ''
  }];


  var flagTable = $('.ui.definition.table > tbody');

  var $row, cc;
  allFlags.forEach(function(flag){
    cc = flag.countrycode.replace(/_/g,' ');
    $row = $('<tr>');
    $row.append($('<td>',{html:'<i class="flag '+cc+'" data-html="<i title=\''+flag.name+'\' class=\'flag huge '+cc+'\'></i>"></i>'}));
    $row.append($('<td>',{text:flag.name}));
    $row.append($('<td>',{text:flag.countrycode.replace(/_/g,' ')}));
    $row.append($('<td>',{text:flag.alias.replace(/_/g,' '),class:flag.alias===''?'disabled':''}));
    flagTable.append($row);
  });
  flagTable.find('i').popup();
};

// attach ready event
$(document)
  .ready(semantic.emoji.ready)
;
