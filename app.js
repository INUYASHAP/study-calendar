// 我的世界学习冒险日历 - 核心逻辑
const STORAGE_KEY = 'mcLearningApp_v3';
const HOLD_DURATION = 1400; // 按住1.4秒

const SKINS = {
    steve: { head: '#F5C6A5', body: '#3D5AFE', legs: '#3F51B5', hair: '#3B2A1A', eye: '#5F85CF' },
    alex: { head: '#FFE0BD', body: '#FF6B9D', legs: '#8B4513' },
    villager: { head: '#D4A574', body: '#5D4037', legs: '#3E2723' },
    knight: { head: '#C0C0C0', body: '#708090', legs: '#2F4F4F' }
};

// MC像素风SVG图标库（集中管理，所有emoji替换为此）
const MC_ICONS = {
    // ---- 任务图标 ----
    book: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="1" y="2" width="14" height="12" fill="#8B4513"/><rect x="2" y="3" width="12" height="10" fill="#FFE4C4"/><rect x="2" y="3" width="12" height="1" fill="#D2B48C"/><rect x="7" y="3" width="1" height="10" fill="#8B4513"/><rect x="3" y="5" width="3" height="1" fill="#654321"/><rect x="9" y="5" width="4" height="1" fill="#654321"/><rect x="3" y="7" width="5" height="1" fill="#654321"/><rect x="9" y="7" width="4" height="1" fill="#654321"/><rect x="3" y="9" width="2" height="1" fill="#654321"/><rect x="3" y="11" width="6" height="1" fill="#654321"/></svg>',
    coffee: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="3" y="6" width="8" height="8" fill="#FFFFFF"/><rect x="2" y="5" width="10" height="1" fill="#E0E0E0"/><rect x="11" y="7" width="2" height="4" fill="#FFFFFF"/><rect x="11" y="6" width="1" height="6" fill="#E0E0E0"/><rect x="3" y="4" width="2" height="1" fill="#C0C0C0"/><rect x="7" y="3" width="2" height="1" fill="#C0C0C0"/><rect x="3" y="2" width="2" height="1" fill="#A0A0A0"/><rect x="7" y="1" width="2" height="1" fill="#A0A0A0"/><rect x="4" y="7" width="6" height="4" fill="#6B3410"/><rect x="4" y="7" width="6" height="1" fill="#8B5413"/><rect x="5" y="14" width="6" height="1" fill="#8B4513"/></svg>',
    pencil: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="11" y="1" width="3" height="10" fill="#8B0000"/><rect x="12" y="1" width="1" height="10" fill="#DC143C"/><rect x="10" y="1" width="1" height="10" fill="#6B0000"/><rect x="11" y="11" width="3" height="2" fill="#E8E8E8"/><rect x="11" y="13" width="3" height="1" fill="#C0C0C0"/><rect x="12" y="14" width="1" height="1" fill="#000000"/><rect x="1" y="14" width="2" height="1" fill="#FFD700"/><rect x="0" y="15" width="4" height="1" fill="#B8860B"/><rect x="1" y="13" width="2" height="1" fill="#FFA500"/></svg>',
    running: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="10" y="1" width="3" height="3" fill="#F5C6A5"/><rect x="11" y="4" width="4" height="4" fill="#FF6B35"/><rect x="9" y="5" width="2" height="4" fill="#FF6B35"/><rect x="13" y="5" width="2" height="3" fill="#F5C6A5"/><rect x="12" y="8" width="2" height="3" fill="#3F51B5"/><rect x="9" y="9" width="3" height="3" fill="#3F51B5"/><rect x="8" y="11" width="2" height="3" fill="#3F51B5"/><rect x="11" y="11" width="2" height="3" fill="#2D2D2D"/><rect x="7" y="14" width="3" height="1" fill="#2D2D2D"/><rect x="11" y="14" width="3" height="1" fill="#2D2D2D"/><rect x="14" y="2" width="1" height="1" fill="#FFFFFF"/><rect x="15" y="3" width="1" height="1" fill="#FFFFFF"/></svg>',
    palette: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="2" y="3" width="12" height="10" fill="#DEB887"/><rect x="1" y="4" width="14" height="8" fill="#D2B48C"/><rect x="2" y="3" width="12" height="1" fill="#E8C89D"/><rect x="3" y="5" width="2" height="2" fill="#FF0000"/><rect x="7" y="5" width="2" height="2" fill="#0000FF"/><rect x="11" y="5" width="2" height="2" fill="#00FF00"/><rect x="5" y="9" width="2" height="2" fill="#FFFF00"/><rect x="9" y="9" width="2" height="2" fill="#FF00FF"/><rect x="4" y="13" width="2" height="1" fill="#8B4513"/><rect x="10" y="13" width="2" height="1" fill="#8B4513"/><rect x="6" y="7" width="4" height="2" fill="#FFFFFF"/><rect x="7" y="8" width="2" height="1" fill="#E0E0E0"/></svg>',
    boxing: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="3" y="5" width="4" height="5" fill="#CC0000"/><rect x="2" y="6" width="6" height="3" fill="#FF3333"/><rect x="4" y="4" width="2" height="1" fill="#FF6666"/><rect x="9" y="5" width="4" height="5" fill="#CC0000"/><rect x="8" y="6" width="6" height="3" fill="#FF3333"/><rect x="10" y="4" width="2" height="1" fill="#FF6666"/><rect x="4" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="10" y="10" width="2" height="2" fill="#FFFFFF"/><rect x="5" y="7" width="2" height="2" fill="#FFFFFF"/><rect x="9" y="7" width="2" height="2" fill="#FFFFFF"/></svg>',

    // ---- 装备图标 ----
    helmet: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="3" y="2" width="10" height="8" fill="#D8AF93"/><rect x="2" y="3" width="12" height="2" fill="#E8BFAB"/><rect x="4" y="4" width="2" height="3" fill="#000000"/><rect x="10" y="4" width="2" height="3" fill="#000000"/><rect x="6" y="5" width="4" height="2" fill="#F5C6A5"/><rect x="3" y="10" width="10" height="2" fill="#C89F83"/><rect x="4" y="12" width="8" height="1" fill="#B88F73"/><rect x="7" y="13" width="2" height="2" fill="#8B4513"/></svg>',
    chest: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="3" y="3" width="10" height="10" fill="#8B4513"/><rect x="4" y="2" width="8" height="2" fill="#A0522D"/><rect x="2" y="4" width="12" height="7" fill="#6B3410"/><rect x="6" y="5" width="4" height="5" fill="#FFD700"/><rect x="7" y="6" width="2" height="3" fill="#FFA500"/><rect x="5" y="10" width="6" height="1" fill="#5A2A0A"/><rect x="3" y="12" width="10" height="1" fill="#5A2A0A"/><rect x="1" y="5" width="2" height="4" fill="#8B4513"/><rect x="13" y="5" width="2" height="4" fill="#8B4513"/></svg>',
    sword: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="8" fill="#C0C0C0"/><rect x="7" y="1" width="1" height="8" fill="#E8E8E8"/><rect x="6" y="8" width="4" height="1" fill="#FFD700"/><rect x="5" y="9" width="6" height="1" fill="#8B4513"/><rect x="7" y="10" width="2" height="4" fill="#6B3410"/><rect x="6" y="13" width="4" height="1" fill="#5A2A0A"/><rect x="6" y="7" width="1" height="1" fill="#FFFFFF"/><rect x="9" y="7" width="1" height="1" fill="#FFFFFF"/></svg>',
    pickaxe: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="1" y="2" width="6" height="3" fill="#4AEDD9"/><rect x="1" y="2" width="6" height="1" fill="#6AEDE9"/><rect x="0" y="3" width="7" height="1" fill="#3ACDC9"/><rect x="2" y="5" width="4" height="1" fill="#2ACCBB"/><rect x="10" y="3" width="5" height="1" fill="#8B4513"/><rect x="11" y="4" width="5" height="1" fill="#6B3410"/><rect x="12" y="5" width="3" height="1" fill="#5A2A0A"/><rect x="6" y="4" width="1" height="9" fill="#8B4513"/><rect x="9" y="4" width="1" height="9" fill="#6B3410"/><rect x="7" y="13" width="2" height="2" fill="#6B3410"/><rect x="7" y="8" width="2" height="1" fill="#5A2A0A"/></svg>',
    boots: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="3" y="8" width="4" height="7" fill="#696969"/><rect x="3" y="8" width="4" height="1" fill="#808080"/><rect x="2" y="12" width="6" height="3" fill="#555555"/><rect x="2" y="14" width="6" height="1" fill="#3A3A3A"/><rect x="9" y="8" width="4" height="7" fill="#696969"/><rect x="9" y="8" width="4" height="1" fill="#808080"/><rect x="8" y="12" width="6" height="3" fill="#555555"/><rect x="8" y="14" width="6" height="1" fill="#3A3A3A"/><rect x="4" y="10" width="2" height="1" fill="#A9A9A9"/><rect x="10" y="10" width="2" height="1" fill="#A9A9A9"/></svg>',

    // ---- 货币图标 ----
    coin: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="2" y="2" width="12" height="12" fill="#FFAA00"/><rect x="3" y="3" width="10" height="10" fill="#FFD700"/><rect x="4" y="4" width="8" height="8" fill="#FFFF00"/><rect x="5" y="5" width="6" height="6" fill="#FFEF5F"/><rect x="6" y="6" width="1" height="1" fill="#FFFFFF"/><rect x="5" y="8" width="1" height="1" fill="#FFFFFF"/><rect x="8" y="5" width="1" height="2" fill="#B8860B"/><rect x="7" y="8" width="2" height="1" fill="#B8860B"/><rect x="7" y="10" width="2" height="1" fill="#B8860B"/></svg>',
    diamond: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="5" y="1" width="6" height="1" fill="#4AEDD9"/><rect x="4" y="2" width="8" height="1" fill="#3ADDC9"/><rect x="3" y="3" width="10" height="1" fill="#4AEDD9"/><rect x="2" y="4" width="12" height="6" fill="#4AEDD9"/><rect x="3" y="10" width="10" height="1" fill="#3ADDC9"/><rect x="4" y="11" width="8" height="1" fill="#2ACCBB"/><rect x="5" y="12" width="6" height="1" fill="#2ACCBB"/><rect x="6" y="13" width="4" height="1" fill="#1ABBAA"/><rect x="4" y="4" width="3" height="3" fill="#FFFFFF"/><rect x="5" y="5" width="1" height="2" fill="#B0F0E8"/></svg>',
    exp: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="3" fill="#FFFF00"/><rect x="5" y="3" width="6" height="2" fill="#FFD700"/><rect x="4" y="5" width="8" height="6" fill="#FFA500"/><rect x="5" y="11" width="6" height="2" fill="#FF8C00"/><rect x="7" y="13" width="2" height="2" fill="#FF6600"/><rect x="6" y="6" width="4" height="3" fill="#FFFFFF"/><rect x="7" y="7" width="2" height="2" fill="#FFFF00"/></svg>',

    // ---- 导航/UI图标 ----
    calendar: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="2" y="3" width="12" height="11" fill="#8B4513"/><rect x="3" y="4" width="10" height="9" fill="#DEB887"/><rect x="2" y="2" width="12" height="2" fill="#654321"/><rect x="3" y="0" width="1" height="3" fill="#654321"/><rect x="12" y="0" width="1" height="3" fill="#654321"/><rect x="4" y="6" width="2" height="2" fill="#8B0000"/><rect x="7" y="6" width="2" height="2" fill="#00008B"/><rect x="10" y="6" width="2" height="2" fill="#006400"/><rect x="4" y="9" width="2" height="2" fill="#FFD700"/><rect x="7" y="9" width="2" height="2" fill="#9370DB"/><rect x="10" y="9" width="2" height="2" fill="#FF8C00"/></svg>',
    trophy: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="4" y="2" width="8" height="8" fill="#FFD700"/><rect x="5" y="1" width="6" height="1" fill="#FFD700"/><rect x="3" y="3" width="1" height="4" fill="#FFD700"/><rect x="12" y="3" width="1" height="4" fill="#FFD700"/><rect x="2" y="4" width="2" height="2" fill="#FFA500"/><rect x="12" y="4" width="2" height="2" fill="#FFA500"/><rect x="5" y="10" width="6" height="2" fill="#CD853F"/><rect x="4" y="12" width="8" height="2" fill="#8B4513"/><rect x="3" y="14" width="10" height="1" fill="#654321"/><rect x="7" y="4" width="2" height="3" fill="#FFFFFF"/><rect x="6" y="7" width="4" height="1" fill="#FFA500"/></svg>',
    shop: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="2" y="4" width="12" height="9" fill="#8B4513"/><rect x="1" y="5" width="14" height="2" fill="#D2691E"/><rect x="3" y="6" width="2" height="2" fill="#FFD700"/><rect x="7" y="6" width="2" height="2" fill="#00CED1"/><rect x="11" y="6" width="2" height="2" fill="#FF6347"/><rect x="3" y="9" width="10" height="4" fill="#A0522D"/><rect x="7" y="9" width="2" height="4" fill="#654321"/><rect x="2" y="13" width="12" height="1" fill="#654321"/><rect x="4" y="2" width="8" height="2" fill="#DC143C"/><rect x="5" y="0" width="6" height="2" fill="#FF4500"/></svg>',
    stats: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="2" y="10" width="2" height="4" fill="#8B4513"/><rect x="4" y="7" width="2" height="7" fill="#00AA00"/><rect x="6" y="5" width="2" height="9" fill="#FFA500"/><rect x="8" y="3" width="2" height="11" fill="#FF4500"/><rect x="10" y="6" width="2" height="8" fill="#9370DB"/><rect x="12" y="2" width="2" height="12" fill="#00CED1"/><rect x="1" y="14" width="14" height="1" fill="#333333"/><rect x="1" y="14" width="14" height="1" fill="#555555"/></svg>',
    hero: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="4" y="1" width="8" height="2" fill="#3B2A1A"/><rect x="3" y="3" width="10" height="4" fill="#F5C6A5"/><rect x="6" y="4" width="1" height="1" fill="#5F85CF"/><rect x="9" y="4" width="1" height="1" fill="#5F85CF"/><rect x="7" y="6" width="2" height="1" fill="#8B6B4A"/><rect x="4" y="7" width="8" height="1" fill="#3D5AFE"/><rect x="3" y="7" width="10" height="6" fill="#3D5AFE"/><rect x="6" y="9" width="4" height="2" fill="#2962FF"/><rect x="3" y="13" width="4" height="3" fill="#3F51B5"/><rect x="9" y="13" width="4" height="3" fill="#3F51B5"/><rect x="3" y="15" width="4" height="1" fill="#2D2D2D"/><rect x="9" y="15" width="4" height="1" fill="#2D2D2D"/></svg>',

    // ---- 时间/天气 ----
    sun: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="2" fill="#FFD700"/><rect x="7" y="13" width="2" height="2" fill="#FFD700"/><rect x="1" y="7" width="2" height="2" fill="#FFD700"/><rect x="13" y="7" width="2" height="2" fill="#FFD700"/><rect x="2" y="2" width="2" height="2" fill="#FFD700"/><rect x="12" y="2" width="2" height="2" fill="#FFD700"/><rect x="2" y="12" width="2" height="2" fill="#FFD700"/><rect x="12" y="12" width="2" height="2" fill="#FFD700"/><rect x="4" y="4" width="8" height="8" fill="#FFFF00"/><rect x="5" y="5" width="6" height="6" fill="#FFEF5F"/></svg>',
    cloud: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="3" y="5" width="10" height="5" fill="#FFFFFF"/><rect x="2" y="6" width="12" height="3" fill="#E8E8E8"/><rect x="4" y="4" width="8" height="1" fill="#F0F0F0"/><rect x="1" y="7" width="2" height="2" fill="#FFFFFF"/><rect x="13" y="7" width="2" height="2" fill="#FFFFFF"/><rect x="3" y="10" width="10" height="1" fill="#D0D0D0"/><rect x="4" y="11" width="8" height="1" fill="#C0C0C0"/><rect x="6" y="12" width="2" height="1" fill="#FFFFFF"/><rect x="10" y="12" width="2" height="1" fill="#FFFFFF"/></svg>',
    moon: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="6" y="1" width="6" height="1" fill="#F5F5DC"/><rect x="5" y="2" width="7" height="1" fill="#E8E8C8"/><rect x="4" y="3" width="8" height="1" fill="#D8D8B8"/><rect x="3" y="4" width="8" height="6" fill="#F0E68C"/><rect x="4" y="10" width="7" height="1" fill="#E0D878"/><rect x="5" y="11" width="6" height="1" fill="#D0C868"/><rect x="6" y="12" width="5" height="1" fill="#C0B858"/><rect x="7" y="13" width="4" height="1" fill="#B0A848"/><rect x="10" y="4" width="2" height="2" fill="#FFFFFF"/><rect x="5" y="6" width="1" height="1" fill="#FFFFFF"/><rect x="8" y="8" width="2" height="1" fill="#FFFFFF"/></svg>',
    home: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="1" fill="#6B3410"/><rect x="5" y="2" width="6" height="1" fill="#8B4513"/><rect x="3" y="3" width="10" height="1" fill="#A0522D"/><rect x="2" y="4" width="12" height="1" fill="#8B4513"/><rect x="3" y="5" width="10" height="9" fill="#DEB887"/><rect x="4" y="6" width="3" height="3" fill="#87CEEB"/><rect x="9" y="6" width="3" height="3" fill="#87CEEB"/><rect x="7" y="9" width="2" height="5" fill="#654321"/><rect x="3" y="14" width="10" height="1" fill="#654321"/><rect x="7" y="1" width="2" height="5" fill="#6B3410"/></svg>',
    clock: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="5" y="2" width="6" height="1" fill="#C0C0C0"/><rect x="4" y="3" width="8" height="1" fill="#D0D0D0"/><rect x="3" y="4" width="10" height="1" fill="#E0E0E0"/><rect x="2" y="5" width="12" height="6" fill="#E8E8E8"/><rect x="3" y="11" width="10" height="1" fill="#D0D0D0"/><rect x="4" y="12" width="8" height="1" fill="#C0C0C0"/><rect x="5" y="13" width="6" height="1" fill="#B0B0B0"/><rect x="6" y="4" width="1" height="6" fill="#FF0000"/><rect x="8" y="4" width="1" height="4" fill="#000000"/><rect x="5" y="5" width="7" height="1" fill="#333333"/></svg>',

    // ---- 特效图标 ----
    lightning: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="4" fill="#FFFF00"/><rect x="6" y="5" width="2" height="3" fill="#FFD700"/><rect x="8" y="5" width="2" height="3" fill="#FFD700"/><rect x="7" y="8" width="2" height="4" fill="#FFA500"/><rect x="6" y="12" width="2" height="3" fill="#FF6600"/><rect x="8" y="12" width="2" height="3" fill="#FF6600"/><rect x="5" y="8" width="1" height="2" fill="#FFFFFF"/><rect x="10" y="8" width="1" height="2" fill="#FFFFFF"/></svg>',
    fire: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="2" fill="#FF0000"/><rect x="6" y="3" width="4" height="2" fill="#FF4500"/><rect x="5" y="5" width="6" height="3" fill="#FF6600"/><rect x="4" y="8" width="8" height="3" fill="#FFA500"/><rect x="5" y="11" width="6" height="2" fill="#FFD700"/><rect x="6" y="13" width="4" height="2" fill="#FFEF5F"/><rect x="7" y="4" width="2" height="3" fill="#FFFF00"/><rect x="6" y="7" width="1" height="4" fill="#FFFFFF"/><rect x="9" y="7" width="1" height="4" fill="#FFFFFF"/></svg>',
    star: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="1" width="2" height="2" fill="#FFD700"/><rect x="6" y="3" width="4" height="1" fill="#FFD700"/><rect x="5" y="4" width="6" height="2" fill="#FFD700"/><rect x="4" y="6" width="2" height="2" fill="#FFA500"/><rect x="2" y="7" width="2" height="2" fill="#FFA500"/><rect x="12" y="7" width="2" height="2" fill="#FFA500"/><rect x="14" y="7" width="2" height="2" fill="#FFA500"/><rect x="5" y="9" width="6" height="2" fill="#FFD700"/><rect x="6" y="11" width="4" height="1" fill="#FFD700"/><rect x="7" y="12" width="2" height="2" fill="#FFD700"/><rect x="7" y="5" width="2" height="1" fill="#FFFFFF"/></svg>',
    heart: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="3" y="4" width="4" height="4" fill="#FF0000"/><rect x="9" y="4" width="4" height="4" fill="#FF0000"/><rect x="2" y="5" width="6" height="5" fill="#FF3333"/><rect x="8" y="5" width="6" height="5" fill="#FF3333"/><rect x="3" y="9" width="4" height="2" fill="#FF0000"/><rect x="9" y="9" width="4" height="2" fill="#FF0000"/><rect x="5" y="11" width="6" height="2" fill="#CC0000"/><rect x="6" y="13" width="4" height="2" fill="#CC0000"/><rect x="7" y="14" width="2" height="1" fill="#CC0000"/><rect x="4" y="5" width="2" height="2" fill="#FFFFFF"/><rect x="10" y="5" width="2" height="2" fill="#FFFFFF"/></svg>',

    // ---- 庆祝粒子 ----
    party: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="7" y="2" width="2" height="3" fill="#FF0000"/><rect x="3" y="5" width="10" height="5" fill="#FF4500"/><rect x="2" y="6" width="12" height="3" fill="#FF6600"/><rect x="3" y="10" width="10" height="2" fill="#FFA500"/><rect x="7" y="12" width="2" height="3" fill="#FFD700"/><rect x="4" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="10" y="6" width="2" height="2" fill="#FFFFFF"/><rect x="7" y="4" width="2" height="1" fill="#FFFF00"/></svg>',

    // ---- 其他 ----
    backpack: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="4" y="2" width="8" height="2" fill="#654321"/><rect x="3" y="4" width="10" height="10" fill="#8B4513"/><rect x="2" y="5" width="12" height="8" fill="#A0522D"/><rect x="5" y="6" width="6" height="1" fill="#654321"/><rect x="5" y="8" width="6" height="4" fill="#6B3410"/><rect x="6" y="9" width="4" height="2" fill="#5A2A0A"/><rect x="7" y="10" width="2" height="1" fill="#FFD700"/><rect x="3" y="14" width="10" height="1" fill="#5A2A0A"/></svg>',
    check: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="6" y="3" width="2" height="2" fill="#00AA00"/><rect x="8" y="3" width="2" height="2" fill="#00AA00"/><rect x="4" y="5" width="2" height="2" fill="#00CC00"/><rect x="6" y="5" width="2" height="2" fill="#00CC00"/><rect x="8" y="5" width="2" height="2" fill="#00CC00"/><rect x="10" y="5" width="2" height="2" fill="#00CC00"/><rect x="2" y="7" width="2" height="2" fill="#00CC00"/><rect x="4" y="7" width="2" height="2" fill="#00CC00"/><rect x="6" y="7" width="2" height="2" fill="#00CC00"/><rect x="8" y="7" width="2" height="2" fill="#00CC00"/><rect x="10" y="7" width="2" height="2" fill="#00CC00"/><rect x="12" y="7" width="2" height="2" fill="#00CC00"/><rect x="4" y="9" width="2" height="2" fill="#00AA00"/><rect x="6" y="9" width="2" height="2" fill="#00AA00"/><rect x="8" y="9" width="2" height="2" fill="#00AA00"/><rect x="10" y="9" width="2" height="2" fill="#00AA00"/><rect x="6" y="11" width="2" height="2" fill="#008800"/><rect x="8" y="11" width="2" height="2" fill="#008800"/><rect x="7" y="13" width="2" height="2" fill="#006600"/></svg>',
    lock: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="5" y="5" width="6" height="2" fill="#808080"/><rect x="4" y="7" width="8" height="1" fill="#A0A0A0"/><rect x="3" y="8" width="10" height="6" fill="#C0C0C0"/><rect x="4" y="14" width="8" height="1" fill="#808080"/><rect x="7" y="10" width="2" height="2" fill="#000000"/><rect x="7" y="12" width="2" height="1" fill="#000000"/><rect x="5" y="3" width="2" height="2" fill="#A0A0A0"/><rect x="9" y="3" width="2" height="2" fill="#A0A0A0"/></svg>',
    pencil_edit: '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="11" y="1" width="3" height="10" fill="#8B0000"/><rect x="12" y="1" width="1" height="10" fill="#DC143C"/><rect x="10" y="1" width="1" height="10" fill="#6B0000"/><rect x="11" y="11" width="3" height="2" fill="#E8E8E8"/><rect x="11" y="13" width="3" height="1" fill="#C0C0C0"/><rect x="12" y="14" width="1" height="1" fill="#000000"/><rect x="1" y="14" width="2" height="1" fill="#FFD700"/><rect x="0" y="15" width="4" height="1" fill="#B8860B"/></svg>'
};

// 获取MC图标SVG（带尺寸控制）
function getMCIcon(key, size) {
    const svg = MC_ICONS[key] || MC_ICONS.placeholder || '';
    const extra = 'style="image-rendering: pixelated;"';
    if (size) {
        return svg.replace('<svg ', `<svg width="${size}" height="${size}" ${extra} `);
    }
    return svg.replace('<svg ', `<svg ${extra} `);
}

const TASK_DATA = {
    morning: [
        {
            id: 'english',
            smallTitle: '轻松开始',
            name: '英语',
            icon: 'book',
            desc: '从你最喜欢的游戏说起，英语会更容易从嘴巴里跑出来。',
            durationLabel: '45分钟学习 + 15分钟休息',
            durationType: 'timer',
            workMinutes: 45,
            restMinutes: 15,
            rewards: { exp: 10, coins: 3 }
        },
        {
            id: 'break',
            smallTitle: '能量补给',
            name: '休息',
            icon: 'coffee',
            desc: '先离开屏幕喝口水，再让眼睛去窗外旅行一分钟。',
            durationLabel: '15分钟休息',
            durationType: 'timer',
            workMinutes: 15,
            restMinutes: 0,
            rewards: { exp: 2, coins: 1 }
        },
        {
            id: 'study',
            smallTitle: '今天这样学',
            name: '学习',
            icon: 'pencil',
            desc: '先从最容易的一小项开始，大脑找到节奏后会越来越顺。',
            durationLabel: '45分钟学习 + 15分钟休息',
            durationType: 'timer',
            workMinutes: 45,
            restMinutes: 15,
            rewards: { exp: 10, coins: 3 }
        }
    ],
    afternoon: [
        {
            id: 'exercise',
            smallTitle: '活力满满',
            name: '运动锻炼',
            icon: 'running',
            desc: '跑步、跳绳、打球，让身体像史蒂夫挖钻石一样充满活力！',
            durationLabel: '45分钟运动 + 15分钟休息',
            durationType: 'timer',
            workMinutes: 45,
            restMinutes: 15,
            rewards: { exp: 8, coins: 3 }
        },
        {
            id: 'aiplay',
            smallTitle: '创意时光',
            name: 'AI游乐园',
            icon: 'palette',
            desc: '和AI一起创作，你的想象力就是最强大的附魔剑！',
            durationLabel: '30分钟',
            durationType: 'timer',
            workMinutes: 30,
            restMinutes: 0,
            rewards: { exp: 5, coins: 2 }
        }
    ],
    evening: [],
    sunday: [
        {
            id: 'boxing',
            smallTitle: '勇士修炼',
            name: '打拳课程',
            icon: 'boxing',
            desc: '武术课，锻炼身体和勇气！就像MC里的铁傀儡一样强壮。',
            durationLabel: '09:00-10:30',
            durationType: 'fixed',
            startTime: '09:00',
            endTime: '10:30',
            rewards: { exp: 15, coins: 5, gems: 1 }
        }
    ]
};

const SHOP_ITEMS = {
    helmet: [
        { id: 'leather_helmet', name: '皮革头盔', icon: 'helmet', desc: '保护头部', price: 50, level: 1 },
        { id: 'iron_helmet', name: '铁头盔', icon: 'helmet', desc: '坚固保护', price: 150, level: 3 },
        { id: 'diamond_helmet', name: '钻石头盔', icon: 'diamond', desc: '顶级防护', price: 500, level: 5 },
        { id: 'netherite_helmet', name: '下界合金头盔', icon: 'helmet', desc: '最强头盔', price: 1000, level: 10 }
    ],
    chest: [
        { id: 'leather_chest', name: '皮革护甲', icon: 'chest', desc: '基础护甲', price: 80, level: 1 },
        { id: 'iron_chest', name: '铁护甲', icon: 'chest', desc: '坚固护甲', price: 200, level: 3 },
        { id: 'diamond_chest', name: '钻石护甲', icon: 'diamond', desc: '闪亮护甲', price: 600, level: 5 },
        { id: 'netherite_chest', name: '下界合金护甲', icon: 'chest', desc: '最强护甲', price: 1200, level: 10 }
    ],
    weapon: [
        { id: 'wood_sword', name: '木剑', icon: 'sword', desc: '入门武器', price: 30, level: 1 },
        { id: 'iron_sword', name: '铁剑', icon: 'sword', desc: '锋利武器', price: 120, level: 2 },
        { id: 'diamond_sword', name: '钻石剑', icon: 'sword', desc: '强力武器', price: 400, level: 4 },
        { id: 'enchanted_sword', name: '附魔金剑', icon: 'star', desc: '魔法武器', price: 800, level: 8 }
    ],
    pickaxe: [
        { id: 'wood_pick', name: '木镐', icon: 'pickaxe', desc: '挖矿入门', price: 20, level: 1 },
        { id: 'iron_pick', name: '铁镐', icon: 'pickaxe', desc: '高效挖矿', price: 100, level: 2 },
        { id: 'diamond_pick', name: '钻石镐', icon: 'pickaxe', desc: '挖黑曜石', price: 350, level: 4 },
        { id: 'enchanted_pick', name: '时运镐', icon: 'star', desc: '掉落翻倍', price: 700, level: 7 }
    ],
    boots: [
        { id: 'leather_boots', name: '皮革靴', icon: 'boots', desc: '基础靴子', price: 40, level: 1 },
        { id: 'iron_boots', name: '铁靴', icon: 'boots', desc: '坚固靴子', price: 100, level: 2 },
        { id: 'feather_boots', name: '羽毛靴', icon: 'boots', desc: '轻盈靴子', price: 300, level: 4 },
        { id: 'magma_boots', name: '岩浆靴', icon: 'boots', desc: '防火靴子', price: 600, level: 7 }
    ]
};

function getExpNeeded(level) { return level * 100; }
function getDateKey(d) { 
    if (typeof d === 'string') return d.split('T')[0];
    return d.toISOString().split('T')[0]; 
}
function isSunday(d) { return d.getDay() === 0; }
function formatDate(d) {
    const today = new Date();
    const yest = new Date(Date.now() - 86400000);
    const tmr = new Date(Date.now() + 86400000);
    if (d.toDateString() === today.toDateString()) return '今天';
    if (d.toDateString() === yest.toDateString()) return '昨天';
    if (d.toDateString() === tmr.toDateString()) return '明天';
    const names = ['日','一','二','三','四','五','六'];
    return `${d.getMonth()+1}月${d.getDate()}日 周${names[d.getDay()]}`;
}

let state = {
    hero: null,
    player: { level: 1, exp: 0, coins: 0, gems: 0 },
    equipment: { helmet: null, chest: null, weapon: null, pickaxe: null, boots: null },
    inventory: [],
    completedTasks: {},
    makeUsedDays: {},
    currentDate: new Date(),
    currentTab: 'morning',
    currentPage: 'task',
    shopCat: 'helmet',
    todayBackpack: [],
    theme: 'nether',
    timer: {
        active: false, taskId: null, taskName: '',
        phase: 'work', phaseRemainingSeconds: 2700,
        totalSeconds: 2700, startTime: 0, isPaused: false
    }
};

// ============ 存储 ============
function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e){}
}
function load() {
    try {
        const s = localStorage.getItem(STORAGE_KEY);
        if (s) {
            Object.assign(state, JSON.parse(s));
            state.timer = state.timer || { 
                active: false, taskId: null, taskName: '',
                phase: 'work', phaseRemainingSeconds: 2700,
                totalSeconds: 2700, startTime: 0, isPaused: false
            };
            // 兼容旧版本计时器（含番茄钟字段）
            if (state.timer.pomodoroCount !== undefined) {
                const task = findTaskById(state.timer.taskId);
                if (task) {
                    state.timer.phase = 'work';
                    state.timer.phaseRemainingSeconds = (task.workMinutes || 45) * 60;
                    state.timer.totalSeconds = state.timer.phaseRemainingSeconds + (task.restMinutes || 0) * 60;
                } else {
                    state.timer.phaseRemainingSeconds = state.timer.totalSeconds || 2700;
                    state.timer.totalSeconds = state.timer.phaseRemainingSeconds;
                }
                state.timer.phase = state.timer.phase || 'work';
                delete state.timer.pomodoroCount;
                delete state.timer.currentPomodoro;
                delete state.timer.segmentSeconds;
                delete state.timer.remainingSeconds;
            }
            // 恢复currentDate为Date对象
            if (typeof state.currentDate === 'string') {
                state.currentDate = new Date(state.currentDate);
            }
            return true;
        }
    } catch(e){}
    return false;
}

// ============ 粒子效果 ============
let particles = [];
let particleAnimId = null;
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    // 粒子类型：0=光点, 1=像素方块, 2=闪烁星
    for (let i = 0; i < 50; i++) {
        const type = Math.random() < 0.5 ? 0 : (Math.random() < 0.7 ? 1 : 2);
        particles.push(createParticle(canvas, type));
    }
    
    function createParticle(canvas, type) {
        const colors = ['#00e5ff', '#00ff88', '#ffd700', '#b44dff', '#ff4da6', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8 - 0.2,
            size: type === 1 ? Math.random() * 6 + 3 : Math.random() * 3 + 1,
            color: color,
            alpha: Math.random() * 0.6 + 0.2,
            type: type,
            life: 1,
            decay: Math.random() * 0.005 + 0.001,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.05 + 0.02
        };
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;
            p.pulse += p.pulseSpeed;
            
            if (p.x < -20) p.x = canvas.width + 20;
            if (p.x > canvas.width + 20) p.x = -20;
            if (p.y < -20) p.y = canvas.height + 20;
            if (p.y > canvas.height + 20) p.y = -20;
            
            const pulseAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
            
            if (p.type === 0) {
                // 发光光点
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = pulseAlpha;
                ctx.fill();
                // 光晕
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.globalAlpha = pulseAlpha * 0.3;
                ctx.fill();
            } else if (p.type === 1) {
                // 像素方块
                ctx.save();
                ctx.globalAlpha = pulseAlpha;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
                // 内部高光
                ctx.fillStyle = 'rgba(255,255,255,' + (pulseAlpha * 0.4) + ')';
                ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size/3, p.size/3);
                ctx.restore();
            } else {
                // 闪烁星星
                const s = p.size * (0.8 + 0.4 * Math.sin(p.pulse));
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.pulse * 0.3);
                ctx.globalAlpha = pulseAlpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const r = i % 2 === 0 ? s : s * 0.4;
                    if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
                    else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        });
        
        ctx.globalAlpha = 1;
        particleAnimId = requestAnimationFrame(animate);
    }
    animate();
}

// ============ 页面切换 ============
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function switchPage(page) {
    state.currentPage = page;
    document.getElementById('shopScreen').classList.remove('active');
    document.getElementById('charScreen').classList.remove('active');
    document.getElementById('statsScreen').classList.remove('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === page));
    if (page === 'shop') { document.getElementById('shopScreen').classList.add('active'); renderShop(); }
    if (page === 'character') { document.getElementById('charScreen').classList.add('active'); renderChar(); }
    if (page === 'stats') { document.getElementById('statsScreen').classList.add('active'); renderStats(); }
}

// ============ 角色 ============
function createHero(name, skin) {
    state.hero = { name: name || '小英雄', skin: skin || 'steve' };
    save();
    applySkin();
    enterMainApp();
}

// ============ 角色选择 ============
const CHARACTER_DATA = {
    steve: {
        name: '史蒂夫',
        colors: { hair: '#3B2A1A', skin: '#F5C6A5', body: '#3D5AFE', legs: '#3F51B5', boots: '#4A4A4A' },
        svg: `<svg class="steve-svg" viewBox="0 0 16 32" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
            <rect x="4" y="0" width="8" height="1" fill="#3B2A1A"/>
            <rect x="3" y="1" width="10" height="2" fill="#3B2A1A"/>
            <rect x="4" y="3" width="8" height="4" fill="#F5C6A5"/>
            <rect x="3" y="3" width="1" height="4" fill="#3B2A1A"/>
            <rect x="12" y="3" width="1" height="4" fill="#3B2A1A"/>
            <rect x="6" y="4" width="1" height="1" fill="#5F85CF"/>
            <rect x="9" y="4" width="1" height="1" fill="#5F85CF"/>
            <rect x="6" y="5" width="1" height="1" fill="#FFFFFF"/>
            <rect x="9" y="5" width="1" height="1" fill="#FFFFFF"/>
            <rect x="7" y="6" width="2" height="1" fill="#8B6B4A"/>
            <rect x="5" y="9" width="6" height="7" fill="#3D5AFE"/>
            <rect x="4" y="9" width="1" height="7" fill="#3D5AFE"/>
            <rect x="11" y="9" width="1" height="7" fill="#3D5AFE"/>
            <rect x="5" y="16" width="6" height="1" fill="#8B6914"/>
            <rect x="5" y="17" width="3" height="6" fill="#3F51B5"/>
            <rect x="8" y="17" width="3" height="6" fill="#3F51B5"/>
            <rect x="5" y="24" width="3" height="2" fill="#4A4A4A"/>
            <rect x="8" y="24" width="3" height="2" fill="#4A4A4A"/>
        </svg>`
    },
    princess: {
        name: '小公主',
        colors: { hair: '#E91E63', skin: '#FFE0BD', body: '#E91E63', legs: '#FFE0BD', boots: '#FF69B4' },
        svg: `<svg class="steve-svg" viewBox="0 0 16 32" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
            <rect x="4" y="0" width="8" height="1" fill="#E91E63"/>
            <rect x="3" y="1" width="10" height="3" fill="#E91E63"/>
            <rect x="2" y="2" width="2" height="5" fill="#E91E63"/>
            <rect x="12" y="2" width="2" height="5" fill="#E91E63"/>
            <rect x="4" y="4" width="8" height="4" fill="#FFE0BD"/>
            <rect x="4" y="4" width="8" height="1" fill="#FF69B4"/>
            <rect x="6" y="6" width="1" height="1" fill="#4A90D9"/>
            <rect x="9" y="6" width="1" height="1" fill="#4A90D9"/>
            <rect x="6" y="7" width="1" height="1" fill="#FFFFFF"/>
            <rect x="9" y="7" width="1" height="1" fill="#FFFFFF"/>
            <rect x="5" y="7" width="1" height="1" fill="#FFB6C1"/>
            <rect x="10" y="7" width="1" height="1" fill="#FFB6C1"/>
            <rect x="7" y="8" width="2" height="1" fill="#FF6B81"/>
            <rect x="4" y="10" width="8" height="6" fill="#FFB6C1"/>
            <rect x="5" y="10" width="6" height="5" fill="#E91E63"/>
            <rect x="5" y="12" width="6" height="1" fill="#FF8DC7"/>
            <rect x="3" y="10" width="1" height="6" fill="#FFE0BD"/>
            <rect x="12" y="10" width="1" height="6" fill="#FFE0BD"/>
            <rect x="5" y="18" width="3" height="4" fill="#FFE0BD"/>
            <rect x="8" y="18" width="3" height="4" fill="#FFE0BD"/>
            <rect x="5" y="22" width="3" height="2" fill="#FFFFFF"/>
            <rect x="8" y="22" width="3" height="2" fill="#FFFFFF"/>
            <rect x="5" y="24" width="3" height="2" fill="#FF69B4"/>
            <rect x="8" y="24" width="3" height="2" fill="#FF69B4"/>
        </svg>`
    },
    adventurer: {
        name: '冒险家',
        colors: { hair: '#8B4513', skin: '#F5C6A5', body: '#228B22', legs: '#4A5568', boots: '#654321' },
        svg: `<svg class="steve-svg" viewBox="0 0 16 32" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
            <rect x="4" y="0" width="8" height="1" fill="#8B4513"/>
            <rect x="3" y="1" width="10" height="3" fill="#8B4513"/>
            <rect x="4" y="4" width="8" height="4" fill="#F5C6A5"/>
            <rect x="4" y="4" width="3" height="2" fill="#A0522D"/>
            <rect x="10" y="4" width="2" height="2" fill="#A0522D"/>
            <rect x="6" y="5" width="1" height="1" fill="#2E8B57"/>
            <rect x="9" y="5" width="1" height="1" fill="#2E8B57"/>
            <rect x="6" y="6" width="1" height="1" fill="#FFFFFF"/>
            <rect x="9" y="6" width="1" height="1" fill="#FFFFFF"/>
            <rect x="7" y="7" width="2" height="1" fill="#8B6B4A"/>
            <rect x="5" y="9" width="6" height="7" fill="#228B22"/>
            <rect x="6" y="12" width="2" height="2" fill="#1A6B1A"/>
            <rect x="5" y="9" width="6" height="1" fill="#2E8B57"/>
            <rect x="4" y="9" width="1" height="7" fill="#228B22"/>
            <rect x="11" y="9" width="1" height="7" fill="#228B22"/>
            <rect x="5" y="16" width="6" height="1" fill="#654321"/>
            <rect x="5" y="17" width="3" height="6" fill="#4A5568"/>
            <rect x="8" y="17" width="3" height="6" fill="#4A5568"/>
            <rect x="5" y="20" width="2" height="2" fill="#2D3748"/>
            <rect x="9" y="20" width="2" height="2" fill="#2D3748"/>
            <rect x="5" y="23" width="3" height="3" fill="#654321"/>
            <rect x="8" y="23" width="3" height="3" fill="#654321"/>
        </svg>`
    }
};

function openCharSelect() {
    document.getElementById('charSelectModal').classList.add('active');
    // 标记当前选中的角色
    const currentChar = state.hero?.skin || 'steve';
    document.querySelectorAll('.cs-char-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.char === currentChar);
    });
}

function closeCharSelect() {
    document.getElementById('charSelectModal').classList.remove('active');
}

function selectCharacter(charKey) {
    if (!CHARACTER_DATA[charKey]) return;
    
    const char = CHARACTER_DATA[charKey];
    state.hero.skin = charKey;
    state.hero.charName = char.name;
    
    // 更新SKINS数据
    SKINS[charKey] = {
        head: char.colors.skin,
        body: char.colors.body,
        legs: char.colors.legs,
        hair: char.colors.hair,
        eye: charKey === 'princess' ? '#4A90D9' : (charKey === 'adventurer' ? '#2E8B57' : '#5F85CF')
    };
    
    // 替换角色详情页的SVG
    const bigChar = document.getElementById('bigCharacter');
    if (bigChar && char.svg) {
        bigChar.innerHTML = char.svg;
    }
    
    applySkin();
    
    // 更新计时器页面的史蒂夫
    const steveCelebrate = document.getElementById('steveCelebrate');
    if (steveCelebrate && char.svg) {
        steveCelebrate.innerHTML = char.svg;
    }
    
    // 显示提示
    showToast(`已切换为「${char.name}」`);
    
    // 关闭弹窗
    setTimeout(() => closeCharSelect(), 500);
    
    save();
}

function applySkin() {
    if (!state.hero) return;
    const skinKey = state.hero.skin || 'steve';
    const s = SKINS[skinKey];
    if (!s) return;
    // 角色创建页面（如存在）
    document.querySelectorAll('.char-head, #charHead').forEach(el => { el.style.background = s.head; });
    document.querySelectorAll('.char-body, #charBody').forEach(el => { el.style.background = s.body; });
    document.querySelectorAll('.char-legs, .bc-legs').forEach(el => { el.style.background = s.legs; });
    // 主页MC角色
    const mcHead = document.getElementById('mcHead');
    if (mcHead) {
        mcHead.style.background = s.head;
        mcHead.style.borderColor = darkenColor(s.head, 20);
        // 更新头发颜色
        mcHead.style.setProperty('--hair-color', s.hair || '#3B2A1A');
    }
    const mcBody = document.getElementById('mcBody');
    if (mcBody) {
        mcBody.style.background = s.body;
        mcBody.style.borderColor = darkenColor(s.body, 30);
    }
    const mcLegs = document.getElementById('mcLegs');
    if (mcLegs) {
        mcLegs.style.background = s.legs;
        mcLegs.style.borderColor = darkenColor(s.legs, 30);
    }
    // 手臂也跟随肤色
    document.querySelectorAll('.mc-arm').forEach(el => {
        el.style.background = s.body;
        el.style.borderColor = darkenColor(s.body, 20);
    });
    document.getElementById('heroTagName').textContent = state.hero.name;
    const charShowName = document.getElementById('charShowName');
    if (charShowName) charShowName.textContent = state.hero.name;
}

function darkenColor(hex, percent) {
    const num = parseInt(hex.replace('#',''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return '#' + (0x1000000 + R*0x10000 + G*0x100 + B).toString(16).slice(1);
}

function enterMainApp() {
    showScreen('mainApp');
    document.getElementById('welcomeScreen').classList.remove('active');
    updateStats();
    renderTasks();
    renderBackpack();
}

// ============ 属性 ============
function updateStats() {
    document.getElementById('playerLevel').textContent = state.player.level;
    document.getElementById('charShowLevel').textContent = state.player.level;
    document.getElementById('coinValue').textContent = state.player.coins;
    document.getElementById('shopCoinVal').textContent = state.player.coins;
    document.getElementById('gemValue').textContent = state.player.gems;
    const need = getExpNeeded(state.player.level);
    document.getElementById('expText').textContent = `${state.player.exp}/${need}`;
    document.getElementById('expBar').style.width = `${(state.player.exp/need)*100}%`;
    renderEquipSlots();
}

function addRewards(r) {
    state.player.exp += r.exp || 0;
    state.player.coins += r.coins || 0;
    state.player.gems += r.gems || 0;
    while (state.player.exp >= getExpNeeded(state.player.level)) {
        state.player.exp -= getExpNeeded(state.player.level);
        state.player.level++;
        showLevelUp();
    }
    updateStats();
    save();
}

function showLevelUp() {
    document.getElementById('luLevel').textContent = `Lv.${state.player.level}`;
    const el = document.getElementById('levelUpFx');
    el.classList.add('active');
    setTimeout(() => el.classList.remove('active'), 3000);
}

function renderEquipSlots() {
    const iconMap = { helmet: 'helmet', chest: 'chest', weapon: 'sword', pickaxe: 'pickaxe', boots: 'boots' };
    for (const slot of ['helmet','chest','weapon','pickaxe','boots']) {
        const qSlot = document.getElementById(slot + 'Slot');
        if (qSlot) {
            const itemId = state.equipment[slot];
            if (itemId) {
                const item = state.inventory.find(i => i.id === itemId);
                if (item) {
                    qSlot.classList.add('has-item');
                    qSlot.innerHTML = getMCIcon(item.icon);
                }
            } else {
                qSlot.classList.remove('has-item');
                qSlot.innerHTML = getMCIcon(iconMap[slot]);
            }
        }
    }
}

// ============ 任务渲染 ============
function getDayTasks(date) {
    const tasks = [];
    const tab = state.currentTab;
    if (tab === 'evening' && isSunday(date)) {
        return TASK_DATA.sunday.map(t => ({...t, period: 'evening'}));
    }
    const list = TASK_DATA[tab] || [];
    return list.map(t => ({...t, period: tab}));
}

function renderTasks() {
    const date = state.currentDate;
    const dateKey = getDateKey(date);
    const todayKey = getDateKey(new Date());
    const tab = state.currentTab;
    
    // 晚上标签只在周日显示打拳
    const eveningTab = document.getElementById('eveningTab');
    if (!isSunday(date)) {
        eveningTab.style.display = 'none';
        if (tab === 'evening') state.currentTab = 'morning';
    } else {
        eveningTab.style.display = 'flex';
    }
    
    document.querySelectorAll('.tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === state.currentTab);
    });
    
    document.getElementById('dateDisplay').textContent = formatDate(date);
    
    const container = document.getElementById('taskCards');
    container.innerHTML = '';
    
    const tasks = getDayTasks(date);
    if (tasks.length === 0) {
        container.innerHTML = '<div style="padding:40px;text-align:center;color:rgba(255,255,255,0.5);font-size:16px;">此时间段暂无任务</div>';
        renderBackpack();
        return;
    }
    
    const canMakeup = dateKey !== todayKey && (state.makeUsedDays[dateKey] === undefined || state.makeUsedDays[dateKey] < 1);
    
    tasks.forEach(task => {
        const completed = state.completedTasks[`${dateKey}_${task.id}`];
        container.appendChild(createTaskCard(task, completed, canMakeup, dateKey));
    });
    
    renderBackpack();
}

function createTaskCard(task, completed, canMakeup, dateKey) {
    const card = document.createElement('div');
    const isTimerActive = state.timer.active && state.timer.taskId === task.id;
    card.className = 'task-card' + (completed ? ' completed' : '') + (isTimerActive ? ' timer-active' : '');
    
    const rewards = task.rewards || {};
    let rewardStr = '';
    if (rewards.exp) rewardStr += `<span class="r-exp">+${rewards.exp}经验</span>`;
    if (rewards.coins) rewardStr += (rewardStr ? ' <span class="sep">·</span> ' : '') + `<span class="r-coin">+${rewards.coins}</span>`;
    if (rewards.gems) rewardStr += (rewardStr ? ' <span class="sep">·</span> ' : '') + `<span class="r-gem">+${rewards.gems} ${getMCIcon('diamond')}</span>`;
    
    let isFixed = task.durationType === 'fixed';
    let locked = false;
    
    if (isFixed) {
        const now = new Date();
        const taskDate = new Date(dateKey + 'T' + task.startTime);
        locked = now < taskDate;
        if (locked) card.classList.add('locked');
    }

    let inlineTimer = '';
    if (isTimerActive) {
        const t = state.timer;
        const phaseLabel = t.phase === 'work' ? '学习中' : '休息中';
        const phaseColor = t.phase === 'work' ? 'var(--accent-cyan)' : 'var(--accent-green)';
        const mm = Math.floor(t.phaseRemainingSeconds / 60).toString().padStart(2, '0');
        const ss = (t.phaseRemainingSeconds % 60).toString().padStart(2, '0');
        inlineTimer = `
            <div class="inline-timer" data-task-id="${task.id}">
                <div class="it-header">
                    <span class="it-phase" style="color:${phaseColor};">● ${phaseLabel}</span>
                    <span class="it-countdown" id="it-countdown-${task.id}">${mm}:${ss}</span>
                </div>
                <div class="it-progress">
                    <div class="it-progress-fill" id="it-fill-${task.id}" style="width:0%;background:${phaseColor};"></div>
                </div>
                <div class="it-controls">
                    ${t.isPaused ? `
                        <button class="it-btn it-resume" id="it-resume-${task.id}">▶ 继续</button>
                    ` : `
                        <button class="it-btn it-pause" id="it-pause-${task.id}">⏸ 暂停</button>
                    `}
                    <button class="it-btn it-finish" id="it-finish-${task.id}" disabled style="opacity:0.5;cursor:not-allowed;">⏳ 完成倒计时后领取</button>
                </div>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="tc-header">
            <div class="tc-icon">${getMCIcon(task.icon)}</div>
            <div class="tc-title-wrap">
                <div class="tc-title-small">${task.smallTitle || ''}</div>
                <div class="tc-title">${task.name}</div>
            </div>
            <div class="tc-duration ${task.durationLabel.length > 5 ? 'short' : ''}">${task.durationLabel}</div>
        </div>
        <div class="tc-desc">${task.desc}</div>
        <div class="tc-divider"></div>
        <div class="tc-reward">
            <div class="tc-reward-text">完成奖励：${rewardStr}</div>
        </div>
        ${inlineTimer}
        <div class="tc-action">
            ${isTimerActive ? '' : completed ? `
                <button class="hold-btn disabled" disabled style="background:linear-gradient(180deg,#00a855,#008040);">
                    <div class="hold-label" style="flex-direction:column;">
                        <span style="display:flex;align-items:center;gap:4px;">${getMCIcon('check')} 已完成</span>
                    </div>
                </button>
            ` : locked ? `
                <button class="hold-btn fixed" disabled style="background:linear-gradient(180deg,#666,#444);border-color:#666;">
                    <div class="hold-label" style="flex-direction:column;">
                        <span style="display:flex;align-items:center;gap:4px;">${getMCIcon('lock')} 课程未开始</span>
                    </div>
                </button>
            ` : `
                <button class="hold-btn ${isFixed ? 'fixed' : ''}" data-task-id="${task.id}" data-makeup="false">
                    <div class="hold-fill"></div>
                    <div class="hold-label" style="flex-direction:column;">
                        <span>${isFixed ? '开始上课' : '开始计时'}</span>
                    </div>
                </button>
            `}
            ${!isTimerActive && canMakeup && !completed ? `
                <button class="hold-btn makeup-btn" data-task-id="${task.id}" data-makeup="true" style="margin-top:8px;background:linear-gradient(180deg,var(--accent-gold),#cc9900);border-color:var(--accent-gold);">
                    <div class="hold-label" style="flex-direction:column;">
                        <span style="display:flex;align-items:center;gap:4px;">${getMCIcon('pencil_edit')} 补签</span>
                    </div>
                </button>
            ` : ''}
        </div>
    `;
    
    // 绑定按住事件
    const holdBtn = card.querySelector('.hold-btn:not(.disabled)');
    if (holdBtn) {
        bindHoldEvent(holdBtn, task, dateKey);
    }

    // 绑定内联计时器控件
    if (isTimerActive) {
        const pauseBtn = card.querySelector(`#it-pause-${task.id}`);
        const resumeBtn = card.querySelector(`#it-resume-${task.id}`);
        const finishBtn = card.querySelector(`#it-finish-${task.id}`);
        if (pauseBtn) pauseBtn.onclick = () => pauseTimerInline(task.id);
        if (resumeBtn) resumeBtn.onclick = () => resumeTimerInline(task.id);
        if (finishBtn) finishBtn.onclick = () => finishTimerInline(task.id);
    }
    
    return card;
}

// ============ 单击交互 ============
function bindHoldEvent(btn, task, dateKey) {
    const handleClick = (e) => {
        if (btn.classList.contains('disabled') || btn.disabled) return;

        // 点击视觉反馈
        btn.style.transform = 'scale(0.95)';
        btn.style.opacity = '0.85';
        setTimeout(() => {
            btn.style.transform = '';
            btn.style.opacity = '';
        }, 150);

        const isMakeup = btn.dataset.makeup === 'true';
        if (task.durationType === 'fixed' && !isMakeup) {
            // 固定课程直接完成
            completeTask(task, dateKey, false);
        } else {
            // 计时器任务
            startTimer(task, dateKey, isMakeup);
        }
    };

    btn.addEventListener('click', handleClick);
}

// ============ 计时器（内联版） ============

function startTimer(task, dateKey, isMakeup = false) {
    const workSec = (task.workMinutes || 45) * 60;
    const restSec = (task.restMinutes || 0) * 60;

    state.timer = {
        active: true,
        taskId: task.id,
        taskName: task.name,
        phase: 'work',
        phaseRemainingSeconds: workSec,
        totalSeconds: workSec + restSec,
        startTime: Date.now(),
        isPaused: false
    };

    // 刷新任务卡片以显示内联计时器
    renderTasks();
    updateInlineTimerDisplay();
    startTimerInterval();
    save();
}

function updateInlineTimerDisplay() {
    const t = state.timer;
    if (!t.active) return;
    
    const cdEl = document.getElementById(`it-countdown-${t.taskId}`);
    const fillEl = document.getElementById(`it-fill-${t.taskId}`);
    if (!cdEl || !fillEl) return;
    
    const m = Math.floor(t.phaseRemainingSeconds / 60);
    const s = t.phaseRemainingSeconds % 60;
    cdEl.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    
    // 进度：基于当前phase的进度
    const task = findTaskById(t.taskId);
    const phaseTotal = t.phase === 'work' 
        ? (task ? task.workMinutes * 60 : 2700)
        : (task ? task.restMinutes * 60 : 900);
    const phaseElapsed = phaseTotal - t.phaseRemainingSeconds;
    const progress = Math.min(100, (phaseElapsed / phaseTotal) * 100);
    fillEl.style.width = progress + '%';
    
    // 更新phase颜色
    const phaseColor = t.phase === 'work' ? 'var(--accent-cyan)' : 'var(--accent-green)';
    fillEl.style.background = phaseColor;
    const phaseEl = document.querySelector(`.inline-timer[data-task-id="${t.taskId}"] .it-phase`);
    if (phaseEl) {
        phaseEl.style.color = phaseColor;
        phaseEl.textContent = `● ${t.phase === 'work' ? '学习中' : '休息中'}`;
    }
}

// 计时器循环 - 每秒更新
let timerInterval = null;

function startTimerInterval() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!state.timer.active) {
            clearInterval(timerInterval);
            timerInterval = null;
            return;
        }
        if (state.timer.isPaused) return;

        state.timer.phaseRemainingSeconds = Math.max(0, state.timer.phaseRemainingSeconds - 1);
        updateInlineTimerDisplay();

        if (state.timer.phaseRemainingSeconds === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            onPhaseComplete();
        }
    }, 1000);
}

function stopTimerInterval() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function onPhaseComplete() {
    const t = state.timer;
    const task = findTaskById(t.taskId);
    if (!task) { finishTimerInline(t.taskId); return; }

    if (t.phase === 'work') {
        const restSec = (task.restMinutes || 0) * 60;
        if (restSec > 0) {
            // 切换到休息阶段
            t.phase = 'rest';
            t.phaseRemainingSeconds = restSec;
            t.startTime = Date.now();
            showToast('学习完成！进入休息时间~');
            updateInlineTimerDisplay();
            startTimerInterval();
        } else {
            // 无休息阶段，启用领取奖励按钮
            enableRewardButton(t.taskId);
            showToast('计时结束！点击领取奖励~');
        }
    } else {
        // 休息阶段完成，启用领取奖励按钮
        enableRewardButton(t.taskId);
        showToast('休息结束！点击领取奖励~');
    }
    save();
}

// 启用领取奖励按钮（倒计时结束后调用）
function enableRewardButton(taskId) {
    const finishBtn = document.getElementById(`it-finish-${taskId}`);
    if (finishBtn) {
        finishBtn.disabled = false;
        finishBtn.style.opacity = '1';
        finishBtn.style.cursor = 'pointer';
        finishBtn.textContent = '✓ 领取奖励';
        // 添加发光效果
        finishBtn.classList.add('ready-to-claim');
    }
}

function pauseTimerInline(taskId) {
    if (!state.timer.active || state.timer.taskId !== taskId) return;
    state.timer.isPaused = true;
    state.timer.pausedTime = Date.now();
    stopTimerInterval();
    renderTasks();
    updateInlineTimerDisplay();
    save();
}

function resumeTimerInline(taskId) {
    if (!state.timer.active || state.timer.taskId !== taskId) return;
    const pauseDur = Date.now() - state.timer.pausedTime;
    state.timer.startTime += pauseDur;
    state.timer.isPaused = false;
    renderTasks();
    updateInlineTimerDisplay();
    startTimerInterval();
    save();
}

function finishTimerInline(taskId) {
    if (!state.timer.active || state.timer.taskId !== taskId) return;

    // 检查倒计时是否已完成（phaseRemainingSeconds 必须为 0）
    if (state.timer.phaseRemainingSeconds > 0) {
        showToast('倒计时未结束，请等待计时完成~');
        return;
    }

    stopTimerInterval();
    const task = findTaskById(taskId);
    const dateKey = getDateKey(state.currentDate);
    
    // 先重置计时器状态，确保 renderTasks 时不会显示内联计时器
    state.timer = { 
        active: false, taskId: null, taskName: '',
        phase: 'work', phaseRemainingSeconds: 2700,
        totalSeconds: 2700, startTime: 0, isPaused: false
    };
    
    // 触发庆祝
    triggerCardCelebration(taskId);
    
    // 标记任务完成（内部会调用 renderTasks）
    if (task) {
        completeTask(task, dateKey, false);
    }
    
    save();
}

function triggerCardCelebration(taskId) {
    const card = document.querySelector(`.task-card .inline-timer[data-task-id="${taskId}"]`);
    if (!card) return;
    const taskCard = card.closest('.task-card');
    if (!taskCard) return;
    
    // 添加庆祝动画类
    taskCard.classList.add('celebrating');
    
    // 触发庆祝粒子
    const particles = ['party', 'star', 'fire', 'heart', 'coin'];
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const p = document.createElement('div');
            p.className = 'celebrate-particle';
            p.innerHTML = getMCIcon(particles[Math.floor(Math.random() * particles.length)]);
            p.style.left = (30 + Math.random() * 40) + '%';
            p.style.top = '30%';
            p.style.setProperty('--tx', ((Math.random() - 0.5) * 100) + 'px');
            p.style.setProperty('--ty', (-50 - Math.random() * 80) + 'px');
            taskCard.appendChild(p);
            setTimeout(() => p.remove(), 1200);
        }, i * 120);
    }
    
    setTimeout(() => taskCard.classList.remove('celebrating'), 1500);
}

function findTaskById(id) {
    for (const key of ['morning', 'afternoon', 'evening']) {
        const task = (TASK_DATA[key] || []).find(t => t.id === id);
        if (task) return task;
    }
    const sundayTask = TASK_DATA.sunday.find(t => t.id === id);
    if (sundayTask) return sundayTask;
    return null;
}

// ============ 完成任务 ============
function completeTask(task, dateKey, isMakeup) {
    const todayKey = getDateKey(new Date());
    const key = `${todayKey}_${task.id}`;
    state.completedTasks[key] = { completedAt: Date.now(), isMakeup };
    
    const rewards = isMakeup ? {
        exp: Math.floor(task.rewards.exp / 2),
        coins: Math.floor(task.rewards.coins / 2),
        gems: 0
    } : task.rewards;
    
    showReward(task.name, rewards);
    addRewards(rewards);
    
    // 加入背包
    state.todayBackpack.push({ id: task.id, name: task.name, icon: task.icon, rewards });
    renderBackpack();
    save();
    renderTasks();
}

function showReward(taskName, rewards) {
    document.getElementById('rewardTaskName').textContent = taskName;
    document.getElementById('rewardExp').textContent = `+${rewards.exp || 0}`;
    document.getElementById('rewardCoins').textContent = `+${rewards.coins || 0}`;
    const gemStat = document.getElementById('rewardGemStat');
    if (rewards.gems > 0) {
        gemStat.style.display = 'block';
        document.getElementById('rewardGems').textContent = `+${rewards.gems}`;
    } else {
        gemStat.style.display = 'none';
    }
    document.getElementById('rewardModal').classList.add('active');
    
    // 飞行动画
    createRewardFlyAnimation(rewards);
}

function createRewardFlyAnimation(rewards) {
    const layer = document.getElementById('rewardFlyLayer');
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    
    const icons = [];
    if (rewards.exp) icons.push('exp');
    if (rewards.coins) icons.push('coin');
    if (rewards.gems) icons.push('diamond');
    
    icons.forEach((icon, i) => {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'fly-reward';
            el.innerHTML = getMCIcon(icon);
            el.style.left = cx + 'px';
            el.style.top = cy + 'px';
            el.style.setProperty('--tx', `${(Math.random()-0.5)*200}px`);
            el.style.setProperty('--ty', `${-(200 + Math.random()*100)}px`);
            layer.appendChild(el);
            setTimeout(() => el.remove(), 1000);
        }, i * 150);
    });
}

// ============ 背包 ============
function renderBackpack() {
    const container = document.getElementById('todayBackpack');
    if (!container) return;
    container.innerHTML = '';
    const todayKey = getDateKey(new Date());
    const todayItems = state.todayBackpack.filter(b => {
        const taskKey = Object.keys(state.completedTasks).find(k => k.endsWith('_' + b.id));
        return taskKey && taskKey.startsWith(todayKey);
    });
    
    if (todayItems.length === 0) {
        container.innerHTML = '<span style="font-size:12px;color:rgba(255,255,255,0.4);">还没有收集物品</span>';
    } else {
        todayItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'bp-item';
            div.innerHTML = getMCIcon(item.icon);
            div.title = item.name;
            container.appendChild(div);
        });
    }
}

// ============ 商店 ============
function renderShop() {
    const cat = state.shopCat;
    const items = SHOP_ITEMS[cat] || [];
    const container = document.getElementById('shopList');
    container.innerHTML = '';
    
    items.forEach(item => {
        const owned = state.inventory.find(i => i.id === item.id);
        const canAfford = state.player.coins >= item.price;
        const levelOk = state.player.level >= item.level;
        
        const div = document.createElement('div');
        div.className = 'shop-item' + (owned ? ' owned' : '') + (!levelOk ? ' locked' : '');
        div.innerHTML = `
            <div class="si-icon">${getMCIcon(item.icon)}</div>
            <div class="si-name">${item.name}</div>
            <div class="si-desc">${item.desc}</div>
            ${item.level > 1 ? `<div class="si-level">需要等级 ${item.level}</div>` : ''}
            <div class="si-price">${getMCIcon('coin')} ${item.price}</div>
            <button class="buy-btn" ${owned || !canAfford || !levelOk ? 'disabled' : ''}>
                ${owned ? '已拥有' : (!levelOk ? '等级不足' : (!canAfford ? '金币不足' : '购买'))}
            </button>
        `;
        
        const btn = div.querySelector('.buy-btn');
        if (!owned && canAfford && levelOk) {
            btn.onclick = () => buyItem(item);
        }
        container.appendChild(div);
    });
}

function buyItem(item) {
    if (state.player.coins < item.price) { showToast('金币不够哦~'); return; }
    state.player.coins -= item.price;
    state.inventory.push({ id: item.id, name: item.name, icon: item.icon, category: getCatById(item.id) });
    showToast(`购买成功! ${item.name}`);
    updateStats();
    renderShop();
    renderChar();
    save();
}

function getCatById(id) {
    for (const [cat, items] of Object.entries(SHOP_ITEMS)) {
        if (items.some(i => i.id === id)) return cat;
    }
    return null;
}

// ============ 角色页 ============
function renderChar() {
    // 装备槽
    for (const slot of ['helmet','chest','weapon','pickaxe','boots']) {
        const el = document.querySelector(`#cdSlots .cd-slot[data-slot="${slot}"]`);
        if (!el) continue;
        const itemId = state.equipment[slot];
        const iconMap = { helmet:'helmet', chest:'chest', weapon:'sword', pickaxe:'pickaxe', boots:'boots' };
        const nameMap = { helmet:'头盔', chest:'护甲', weapon:'武器', pickaxe:'工具', boots:'鞋子' };
        
        if (itemId) {
            const item = state.inventory.find(i => i.id === itemId);
            if (item) {
                el.classList.add('filled');
                el.innerHTML = `${getMCIcon(item.icon)}<span>${item.name}</span>`;
            }
        } else {
            el.classList.remove('filled');
            el.innerHTML = `${getMCIcon(iconMap[slot])}<span>${nameMap[slot]}</span>`;
        }
        el.onclick = () => {
            if (state.equipment[slot]) unequipItem(slot);
        };
    }
    
    // 背包
    const inv = document.getElementById('cdInv');
    if (state.inventory.length === 0) {
        inv.innerHTML = '<div class="cd-empty">背包空空的~<br>去商店逛逛吧!</div>';
    } else {
        inv.innerHTML = '';
        state.inventory.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cd-inv-item' + (state.equipment[item.category] === item.id ? ' equipped' : '');
            div.innerHTML = `${item.icon}<small>${item.name}</small>`;
            div.onclick = () => equipItem(item.id);
            inv.appendChild(div);
        });
    }
}

function equipItem(itemId) {
    const item = state.inventory.find(i => i.id === itemId);
    if (!item) return;
    const cat = item.category;
    state.equipment[cat] = itemId;
    showToast(`装备了 ${item.name}!`);
    updateStats();
    renderChar();
    save();
}

function unequipItem(cat) {
    state.equipment[cat] = null;
    showToast('已卸下装备');
    updateStats();
    renderChar();
    save();
}

// ============ 成绩页 ============
function renderStats() {
    document.getElementById('totalDays').textContent = getTotalDays();
    document.getElementById('totalTasks').textContent = Object.keys(state.completedTasks).length;
    document.getElementById('totalMinutes').textContent = Object.keys(state.completedTasks).length * 30;
    document.getElementById('streakDays').textContent = getStreakDays();
    
    const chart = document.getElementById('weekChart');
    chart.innerHTML = '';
    const names = ['日','一','二','三','四','五','六'];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dk = getDateKey(d);
        let count = 0;
        Object.keys(state.completedTasks).forEach(k => { if (k.startsWith(dk)) count++; });
        const max = 5;
        const h = max > 0 ? (count / max) * 100 : 0;
        const bar = document.createElement('div');
        bar.className = 'w-bar';
        bar.innerHTML = `<div class="w-fill" style="height:${Math.max(h,3)}%"></div><div class="w-label">周${names[d.getDay()]}</div>`;
        chart.appendChild(bar);
    }
    
    // 绑定主题切换
    bindThemeSwitcher();
}

// ============ 主题切换 ============
function applyTheme(themeName) {
    state.theme = themeName;
    const root = document.documentElement;
    if (themeName === 'nether') {
        root.removeAttribute('data-theme');
    } else {
        root.setAttribute('data-theme', themeName);
    }
    // 更新UI选中状态
    document.querySelectorAll('.theme-opt').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.themeName === themeName);
    });
    save();
}

function bindThemeSwitcher() {
    const opts = document.querySelectorAll('.theme-opt');
    opts.forEach(opt => {
        opt.onclick = () => applyTheme(opt.dataset.themeName);
    });
    // 同步当前主题
    document.querySelectorAll('.theme-opt').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.themeName === state.theme);
    });
}

function initTheme() {
    if (state.theme && state.theme !== 'nether') {
        document.documentElement.setAttribute('data-theme', state.theme);
    }
}

function getTotalDays() {
    const dates = new Set();
    Object.keys(state.completedTasks).forEach(k => dates.add(k.split('_')[0]));
    return dates.size;
}

function getStreakDays() {
    const completed = new Set();
    Object.keys(state.completedTasks).forEach(k => completed.add(k.split('_')[0]));
    let streak = 0;
    let d = new Date();
    while (completed.has(getDateKey(d))) { streak++; d.setDate(d.getDate() - 1); }
    return streak;
}

// ============ Toast & Modal ============
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

function showModal(title, msg, onOk) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMsg').textContent = msg;
    document.getElementById('modalMask').classList.add('active');
    
    const okBtn = document.getElementById('modalOk');
    const cancelBtn = document.getElementById('modalCancel');
    const close = () => document.getElementById('modalMask').classList.remove('active');
    
    okBtn.onclick = () => { close(); onOk(); };
    cancelBtn.onclick = close;
}

// ============ 事件绑定 ============
function bindEvents() {
    // 欢迎页按钮
    document.getElementById('enterAdventureBtn').onclick = () => {
        if (!state.hero) {
            state.hero = { name: '七宝', skin: 'steve' };
            save();
        }
        applySkin();
        enterMainApp();
    };
    
    // 角色创建
    document.querySelectorAll('.skin-opt').forEach(opt => {
        opt.onclick = () => {
            document.querySelectorAll('.skin-opt').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            const skin = opt.dataset.skin;
            const s = SKINS[skin];
            if (s) {
                document.getElementById('charHead').style.background = s.head;
                document.getElementById('charBody').style.background = s.body;
            }
        };
    });
    
    document.getElementById('createHeroBtn').onclick = () => {
        const name = document.getElementById('heroName').value.trim() || '小英雄';
        const activeSkin = document.querySelector('.skin-opt.active');
        createHero(name, activeSkin ? activeSkin.dataset.skin : 'steve');
    };
    
    // 日期导航
    document.getElementById('prevDay').onclick = () => {
        state.currentDate.setDate(state.currentDate.getDate() - 1);
        renderTasks();
    };
    document.getElementById('nextDay').onclick = () => {
        state.currentDate.setDate(state.currentDate.getDate() + 1);
        renderTasks();
    };
    document.getElementById('todayBtn').onclick = () => {
        state.currentDate = new Date();
        renderTasks();
    };
    
    // 标签页
    document.querySelectorAll('.tab').forEach(tab => {
        tab.onclick = () => {
            state.currentTab = tab.dataset.tab;
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTasks();
        };
    });
    
    // 底部导航
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.onclick = () => switchPage(btn.dataset.page);
    });
    
    // 计时器控制 - 已改为内联模式，按钮在 createTaskCard 中绑定
    document.getElementById('claimRewardBtn').onclick = () => {
        document.getElementById('rewardModal').classList.remove('active');
    };
    
    // 角色选择弹窗
    document.getElementById('csCloseBtn').onclick = closeCharSelect;
    document.getElementById('changeCharBtn').onclick = openCharSelect;
    document.querySelectorAll('.cs-char-card').forEach(card => {
        card.onclick = () => selectCharacter(card.dataset.char);
    });
    
    // 商店分类
    document.querySelectorAll('.s-cat').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.s-cat').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.shopCat = btn.dataset.cat;
            renderShop();
        };
    });
    
    // 装备槽点击（快速栏）
    document.querySelectorAll('.q-slot').forEach(slot => {
        slot.onclick = () => {
            const cat = slot.dataset.slot;
            if (state.equipment[cat]) {
                unequipItem(cat);
            } else {
                showToast('去商店购买装备吧！');
            }
        };
    });
    
    // 窗口关闭保存
    window.addEventListener('beforeunload', save);
    
    // 窗口大小变化时重新初始化粒子
    window.addEventListener('resize', () => {
        particles = [];
        initParticles();
    });
}

// ============ 初始化 ============
const DAILY_TIPS = [
    '先做简单的任务，大脑热身更快哦！',
    '每完成一个任务，你就离钻石装备更近一步！',
    '把学习想象成打怪升级，越努力等级越高！',
    '能量条满了就能升级，解锁更强技能！',
    '1小时专注 = 打败一个末影龙！',
    '每天坚持，你就是学习世界的冠军！',
    '困难的任务放中间做，头脑最清醒！',
    '目标1小时，专注就赢了一半！',
    '收集宝石，兑换MC道具，装备你的英雄！',
    '今天的地图等你探索，出发吧冒险家！'
];

const DAILY_DESCS = [
    '下界传送门已激活，准备开启今天的冒险！',
    '新的一天，新的任务，收集更多宝石吧！',
    '早安冒险家！今天的地图已更新！',
    '传送门已稳定，进入你的学习世界！',
    '今日的宝藏在等你挖掘，加油！',
    '把每一分钟都变成经验值！',
    '成为学习大师，从今天开始！',
    '你的英雄需要升级，快去完成任务！'
];

function init() {
    load();
    initTheme();
    initParticles();
    bindEvents();
    
    const today = new Date();
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const tipIndex = dayOfYear % DAILY_TIPS.length;
    const descIndex = dayOfYear % DAILY_DESCS.length;
    
    // 更新欢迎页
    const welcomeDate = document.getElementById('welcomeDate');
    if (welcomeDate) welcomeDate.textContent = `${today.getMonth()+1}月${today.getDate()}日`;
    const welcomeWeek = document.getElementById('welcomeWeek');
    if (welcomeWeek) welcomeWeek.textContent = weekDays[today.getDay()];
    const welcomeDesc = document.getElementById('welcomeDesc');
    if (welcomeDesc) welcomeDesc.textContent = DAILY_DESCS[descIndex];
    const dailyTip = document.getElementById('dailyTip');
    if (dailyTip) dailyTip.textContent = DAILY_TIPS[tipIndex];
    
    if (state.hero) {
        showScreen('welcomeScreen');
        applySkin();
    } else {
        showScreen('welcomeScreen');
    }
    
    // 恢复计时器 - 内联模式
    if (state.timer && state.timer.active && state.timer.phaseRemainingSeconds > 0) {
        renderTasks();
        updateInlineTimerDisplay();
        startTimerInterval();
    }
    
    // 渲染初始数据
    updateStats();
    renderTasks();
}

function getTaskIcon(taskId) {
    const map = { english:'📚', exercise:'🏃', boxing:'🥊', study:'✏️', break:'☕', aiplay:'🎨' };
    return map[taskId] || '⏱️';
}

// 暴露给内联按钮使用
window.startTimer = startTimer;
window.pauseTimerInline = pauseTimerInline;
window.resumeTimerInline = resumeTimerInline;
window.finishTimerInline = finishTimerInline;
window.switchPage = switchPage;

// ============ 测试工具 ============
window.__testTimer = function(workSec = 5, restSec = 3) {
    const testTask = {
        id: '__test_' + Date.now(),
        smallTitle: '测试',
        name: '⚡测试任务',
        icon: 'redstone',
        desc: `测试模式：${workSec}秒学习 + ${restSec}秒休息`,
        durationLabel: `${workSec}秒+${restSec}秒`,
        durationType: 'timer',
        workMinutes: workSec / 60,
        restMinutes: restSec / 60,
        rewards: { exp: 50, coins: 20, gems: 1 }
    };
    
    // 临时加入morning列表
    TASK_DATA.morning.unshift(testTask);
    
    // 立即开始
    startTimer(testTask, getDateKey(state.currentDate), false);
    
    console.log(`[测试] 计时器已启动：${workSec}秒学习 → ${restSec}秒休息 → 完成`);
    console.log('[测试] 在控制台输入 __testCleanup() 可清除测试任务');
};

window.__testCleanup = function() {
    TASK_DATA.morning = TASK_DATA.morning.filter(t => !t.id.startsWith('__test_'));
    state.timer = { active: false, taskId: null, taskName: '', phase: 'work', phaseRemainingSeconds: 2700, totalSeconds: 2700, startTime: 0, isPaused: false };
    save();
    renderTasks();
    console.log('[测试] 已清理测试数据');
};

window.__testSkipPhase = function() {
    if (!state.timer.active) { console.log('[测试] 没有活跃的计时器'); return; }
    const task = findTaskById(state.timer.taskId);
    const phaseTotal = state.timer.phase === 'work' 
        ? (task ? task.workMinutes * 60 : 60)
        : (task ? task.restMinutes * 60 : 60);
    state.timer.phaseRemainingSeconds = 1;
    state.timer.startTime = Date.now() - (phaseTotal - 1) * 1000;
    console.log('[测试] 已跳转到下一阶段');
};

// ============ 页面导航测试工具 ============
window.__testNav = function() {
    const results = [];
    const screens = ['shop', 'character', 'stats'];
    const pageNames = { shop: '商店', character: '英雄', stats: '成绩' };
    
    console.log('========== 页面导航测试 ==========');
    
    // 逐个测试每个页面的返回按钮
    for (const screen of screens) {
        // 进入页面
        switchPage(screen);
        
        // 检查页面是否激活
        const screenId = screen === 'character' ? 'charScreen' : screen + 'Screen';
        const screenEl = document.getElementById(screenId);
        const isActive = screenEl && screenEl.classList.contains('active');
        
        // 检查返回按钮是否存在
        const backBtn = screenEl ? screenEl.querySelector('.back-btn') : null;
        const hasBackBtn = !!backBtn;
        
        console.log(`[${pageNames[screen]}] 页面激活: ${isActive ? '✅' : '❌'}, 返回按钮: ${hasBackBtn ? '✅' : '❌'}`);
        
        if (hasBackBtn) {
            // 点击返回按钮
            backBtn.click();
            
            // 检查是否回到任务页面 (currentPage === 'task' 且当前页面未激活)
            const isBackToTask = state.currentPage === 'task' && !screenEl.classList.contains('active');
            
            console.log(`  ↳ 返回任务页面: ${isBackToTask ? '✅' : '❌'}`);
            results.push({ screen, isActive, hasBackBtn, isBackToTask });
        } else {
            results.push({ screen, isActive, hasBackBtn: false, isBackToTask: false });
        }
    }
    
    console.log('================================');
    console.log('测试结果汇总:');
    const allPassed = results.every(r => r.isActive && r.hasBackBtn && r.isBackToTask);
    console.log(allPassed ? '✅ 所有页面返回按钮测试通过！' : '❌ 部分测试失败，请检查');
    console.log('================================');
    
    return { allPassed, results };
};

window.__goTo = function(page) {
    switchPage(page);
    const names = { shop: '商店', character: '英雄', stats: '成绩', task: '任务' };
    console.log(`[导航] 已跳转到: ${names[page] || page}`);
    return `已进入${names[page] || page}页面`;
};

document.addEventListener('DOMContentLoaded', init);
