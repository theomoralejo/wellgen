const products = [
    {
        id: 'enantato',
        name: 'Enantato de Testosterona',
        shortDesc: 'Éster de liberação lenta. Aumenta força e massa bruta.',
        fullDesc: 'Éster de liberação lenta. Liga-se aos receptores androgênicos, estimulando a síntese proteica e retenção de nitrogênio. Aumenta força e massa bruta.',
        category: 'Injetáveis',
        specs: { concentration: '250 mg/mL', presentation: 'Frasco de 10mL', halfLife: '5-7 Dias' },
        image: 'img/products/enantato.webp'
    },
    {
        id: 'primobolan',
        name: 'Acetato de Metenolona',
        shortDesc: 'Derivado de DHT. Queima de gordura e preservação muscular.',
        fullDesc: 'Derivado de DHT, não aromatiza. Ação anabólica suave e androgênica baixa. Promove queima de gordura e preservação muscular (cutting).',
        category: 'Orais',
        specs: { concentration: '10mg/cap', presentation: 'Frasco c/ 100 caps', halfLife: '4-6 Horas' },
        image: 'img/products/primobolan.webp'
    },
    {
        id: 'deca',
        name: 'Decanoato de Nandrolona',
        shortDesc: 'Altamente anabólico, estimula síntese de colágeno.',
        fullDesc: 'Aumenta a síntese de colágeno e mineralização óssea (lubrifica articulações). Altamente anabólico, estimula o apetite e produção de hemácias.',
        category: 'Injetáveis',
        specs: { concentration: '250 mg/mL', presentation: 'Frasco de 10mL', halfLife: '14-16 Dias' },
        image: 'img/products/deca.webp'
    },
    {
        id: 'trembolona',
        name: 'Acetato de Trembolona',
        shortDesc: '5x mais potente que a testosterona. Rigidez extrema.',
        fullDesc: '5x mais potente que a testosterona. Liga-se fortemente ao receptor androgênico. Promove rigidez muscular extrema e queima de gordura. Não retém líquido.',
        category: 'Injetáveis',
        specs: { concentration: '100 mg/mL', presentation: 'Frasco de 10mL', halfLife: '3 Dias' },
        image: 'img/products/trembolona.webp'
    },
    {
        id: 'npp',
        name: 'Fenilpropionato de Nandrolona',
        shortDesc: 'Éster curto da nandrolona. Ação rápida, menos retenção.',
        fullDesc: 'Éster curto da nandrolona. Ação mais rápida que a Deca, com menos retenção hídrica. Sai do sistema mais rapidamente.',
        category: 'Injetáveis',
        specs: { concentration: '100 mg/mL', presentation: 'Frasco de 10mL', halfLife: '4-5 Dias' },
        image: 'img/products/npp.webp'
    },
    {
        id: 'propionato',
        name: 'Propionato de Testosterona',
        shortDesc: 'Testosterona de ação rápida. Pico plasmático imediato.',
        fullDesc: 'Testosterona de ação rápida. Promove pico plasmático imediato. Menor retenção hídrica comparada ao Enantato/Cipionato.',
        category: 'Injetáveis',
        specs: { concentration: '100 mg/mL', presentation: 'Frasco de 10mL', halfLife: '2-3 Dias' },
        image: 'img/products/propionato.webp'
    },
    {
        id: 'oxandrolona',
        name: 'Oxandrolona',
        shortDesc: 'Potente anabólico. Aumenta força sem reter água.',
        fullDesc: 'Potente anabólico com baixo efeito androgênico. Aumenta a fosfocreatina intramuscular (força) sem reter água. Hepatotoxicidade leve a moderada.',
        category: 'Orais',
        specs: { concentration: '10mg/cap', presentation: 'Frasco c/ 100 caps', halfLife: '9 Horas' },
        image: 'img/products/oxandrolona.webp'
    },
    {
        id: 'masteron',
        name: 'Propionato de Drostonolona',
        shortDesc: 'Derivado do DHT. Densidade e dureza muscular.',
        fullDesc: 'Derivado do DHT (Masteron). Possui efeito anti-estrogênico moderado. Aumenta a densidade e dureza muscular. Usado em pré-contest.',
        category: 'Injetáveis',
        specs: { concentration: '100 mg/mL', presentation: 'Frasco de 10mL', halfLife: '2-3 Dias' },
        image: 'img/products/masteron.webp'
    },
    {
        id: 'hemogenin',
        name: 'Oximetolona',
        shortDesc: 'Aumenta drasticamente volume muscular e força.',
        fullDesc: 'Um dos orais mais potentes. Aumenta drasticamente a eritropoiese (glóbulos vermelhos) e volume muscular (retenção). Altamente hepatotóxico.',
        category: 'Orais',
        specs: { concentration: '50 mg/comp', presentation: 'Frasco c/ 50 comps', halfLife: '8-9 Horas' },
        image: 'img/products/hemogenin.webp'
    },
    {
        id: 'durateston',
        name: 'Sais de Testosterona (Blend)',
        shortDesc: 'Combinação de 4 ésteres. Níveis estáveis e ação rápida.',
        fullDesc: 'Combinação de ésteres de ação curta, média e longa (Durateston). Mantém níveis estáveis por mais tempo com início de ação rápido.',
        category: 'Injetáveis',
        specs: { concentration: '250 mg/mL', presentation: 'Frasco de 10mL', halfLife: 'Variável' },
        image: 'img/products/durateston.webp'
    },
    {
        id: 'stanozolol',
        name: 'Stanozolol',
        shortDesc: 'Ganhos secos e redução de SHBG.',
        fullDesc: 'Aumenta a síntese proteica e reduz o SHBG (aumentando a testo livre). Promove ganhos secos. Pode ressecar articulações.',
        category: 'Injetáveis',
        specs: { concentration: '50 mg/mL', presentation: 'Frasco de 30mL', halfLife: '24 Horas' },
        image: 'img/products/stanozolol.webp'
    }
];
