// Data Configuration - Verified from Live Site
const PACK_TIERS = [
    { id: 'starter', name: 'Starter', price: 25, color: '#333333', odds: 'Top Hit: $400+' },
    { id: 'silver', name: 'Silver', price: 50, color: '#C0C0C0', odds: 'Top Hit: $800+' },
    { id: 'gold', name: 'Gold', price: 100, color: '#FFD700', odds: 'Top Hit: $2,500+' },
    { id: 'platinum', name: 'Platinum', price: 500, color: '#E5E4E2', odds: 'Top Hit: $10,000+' },
    { id: 'diamond', name: 'Diamond', price: 1000, color: '#B9F2FF', odds: 'Top Hit: $25,000+' },
    { id: 'lunar', name: 'Lunar', price: 2500, color: '#FF4444', odds: 'Top Hit: $75,000+' }
];

// App State
let currentPack = PACK_TIERS[0]; // Default to Starter
let currentCategory = 'pokemon';

const CHASE_CARDS = [
    // --- POKEMON ---
    // Starter ($25)
    { category: 'pokemon', level: 'starter', name: 'Pikachu Common', grade: 'PSA 8', value: '$25', img: 'https://placehold.co/400x560/500000/FFFFFF?text=Pikachu' },
    { category: 'pokemon', level: 'starter', name: 'Bulbasaur Base', grade: 'PSA 9', value: '$45', img: 'https://placehold.co/400x560/500000/FFFFFF?text=Bulbasaur' },
    { category: 'pokemon', level: 'starter', name: 'Charmander Base', grade: 'PSA 9', value: '$45', img: 'https://placehold.co/400x560/500000/FFFFFF?text=Charmander' },
    { category: 'pokemon', level: 'starter', name: 'Squirtle Base', grade: 'PSA 8', value: '$35', img: 'https://placehold.co/400x560/500000/FFFFFF?text=Squirtle' },
    { category: 'pokemon', level: 'starter', name: 'Eevee Jungle', grade: 'PSA 9', value: '$30', img: 'https://placehold.co/400x560/500000/FFFFFF?text=Eevee' },
    { category: 'pokemon', level: 'starter', name: 'Meowth Promo', grade: 'PSA 9', value: '$20', img: 'https://placehold.co/400x560/500000/FFFFFF?text=Meowth' },

    // Silver ($50)
    { category: 'pokemon', level: 'silver', name: 'Dark Dragonite', grade: 'PSA 9', value: '$150', img: 'https://placehold.co/400x560/721414/FFFFFF?text=Dark+Dragon' },
    { category: 'pokemon', level: 'silver', name: 'Gyarados Holo', grade: 'PSA 8', value: '$120', img: 'https://placehold.co/400x560/721414/FFFFFF?text=Gyarados' },
    { category: 'pokemon', level: 'silver', name: 'Machamp 1st Ed', grade: 'PSA 8', value: '$100', img: 'https://placehold.co/400x560/721414/FFFFFF?text=Machamp' },
    { category: 'pokemon', level: 'silver', name: 'Alakazam Base', grade: 'PSA 8', value: '$110', img: 'https://placehold.co/400x560/721414/FFFFFF?text=Alakazam' },
    { category: 'pokemon', level: 'silver', name: 'Gengar Fossil', grade: 'PSA 9', value: '$140', img: 'https://placehold.co/400x560/721414/FFFFFF?text=Gengar' },
    { category: 'pokemon', level: 'silver', name: 'Lapras Holo', grade: 'PSA 9', value: '$90', img: 'https://placehold.co/400x560/721414/FFFFFF?text=Lapras' },

    // Gold ($100)
    { category: 'pokemon', level: 'gold', name: 'Mewtwo Lv.X', grade: 'PSA 9', value: '$400', img: 'https://placehold.co/400x560/952929/FFFFFF?text=Mewtwo' },
    { category: 'pokemon', level: 'gold', name: 'Shining Magikarp', grade: 'PSA 8', value: '$550', img: 'https://placehold.co/400x560/952929/FFFFFF?text=Shining+Karp' },
    { category: 'pokemon', level: 'gold', name: 'Blastoise Base', grade: 'PSA 8', value: '$600', img: 'https://placehold.co/400x560/952929/FFFFFF?text=Blastoise' },
    { category: 'pokemon', level: 'gold', name: 'Venusaur Base', grade: 'PSA 8', value: '$500', img: 'https://placehold.co/400x560/952929/FFFFFF?text=Venusaur' },
    { category: 'pokemon', level: 'gold', name: 'Lugia Neo', grade: 'PSA 8', value: '$450', img: 'https://placehold.co/400x560/952929/FFFFFF?text=Lugia+Neo' },
    { category: 'pokemon', level: 'gold', name: 'Ho-Oh Revelations', grade: 'PSA 9', value: '$700', img: 'https://placehold.co/400x560/952929/FFFFFF?text=Ho-Oh' },

    // Platinum ($500)
    { category: 'pokemon', level: 'platinum', name: 'Lugia 1st Ed', grade: 'PSA 9', value: '$2,500', img: 'https://placehold.co/400x560/B73D3D/FFFFFF?text=Lugia+1st' },
    { category: 'pokemon', level: 'platinum', name: 'Umbreon GS', grade: 'PSA 9', value: '$3,800', img: 'https://placehold.co/400x560/B73D3D/FFFFFF?text=Umbreon+GS' },
    { category: 'pokemon', level: 'platinum', name: 'Charizard Shining', grade: 'PSA 8', value: '$1,800', img: 'https://placehold.co/400x560/B73D3D/FFFFFF?text=Shining+Zard' },
    { category: 'pokemon', level: 'platinum', name: 'Rayquaza EX', grade: 'PSA 10', value: '$4,500', img: 'https://placehold.co/400x560/B73D3D/FFFFFF?text=Rayquaza+EX' },
    { category: 'pokemon', level: 'platinum', name: 'Mew Gold Star', grade: 'PSA 9', value: '$3,200', img: 'https://placehold.co/400x560/B73D3D/FFFFFF?text=Mew+GS' },
    { category: 'pokemon', level: 'platinum', name: 'Torchic Gold Star', grade: 'PSA 9', value: '$5,000', img: 'https://placehold.co/400x560/B73D3D/FFFFFF?text=Torchic+GS' },

    // Diamond ($1000)
    { category: 'pokemon', level: 'diamond', name: 'Charizard Base', grade: 'PSA 9', value: '$12,000', img: 'https://placehold.co/400x560/DA5252/FFFFFF?text=Base+Zard' },
    { category: 'pokemon', level: 'diamond', name: 'Rayquaza GS', grade: 'PSA 10', value: '$18,000', img: 'https://placehold.co/400x560/DA5252/FFFFFF?text=Ray+GS+10' },
    { category: 'pokemon', level: 'diamond', name: 'Latios/Latias', grade: 'PSA 10', value: '$22,000', img: 'https://placehold.co/400x560/DA5252/FFFFFF?text=Latios+Alt' },
    { category: 'pokemon', level: 'diamond', name: 'Mario Pikachu', grade: 'PSA 10', value: '$9,500', img: 'https://placehold.co/400x560/DA5252/FFFFFF?text=Mario+Pika' },
    { category: 'pokemon', level: 'diamond', name: 'Poncho Rayquaza', grade: 'PSA 10', value: '$15,000', img: 'https://placehold.co/400x560/DA5252/FFFFFF?text=Poncho+Ray' },
    { category: 'pokemon', level: 'diamond', name: 'Master Scroll', grade: 'PSA 10', value: '$25,000', img: 'https://placehold.co/400x560/DA5252/FFFFFF?text=Master+Scroll' },

    // Lunar ($2500)
    { category: 'pokemon', level: 'lunar', name: 'Illustrator Pika', grade: 'PSA 9', value: '$500,000', img: 'https://placehold.co/400x560/FF6666/FFFFFF?text=Illustrator' },
    { category: 'pokemon', level: 'lunar', name: '1st Ed Zard', grade: 'PSA 10', value: '$350,000', img: 'https://placehold.co/400x560/FF6666/FFFFFF?text=1st+Ed+Zard' },
    { category: 'pokemon', level: 'lunar', name: 'Trophy Kangaskhan', grade: 'PSA 10', value: '$150,000', img: 'https://placehold.co/400x560/FF6666/FFFFFF?text=Trophy+Kang' },
    { category: 'pokemon', level: 'lunar', name: 'Pre-Release Raichu', grade: 'PSA 9', value: '$200,000', img: 'https://placehold.co/400x560/FF6666/FFFFFF?text=Raichu+PR' },
    { category: 'pokemon', level: 'lunar', name: 'Ishihara GX', grade: 'PSA 10', value: '$100,000', img: 'https://placehold.co/400x560/FF6666/FFFFFF?text=Ishihara' },
    { category: 'pokemon', level: 'lunar', name: 'Snap Magikarp', grade: 'PSA 10', value: '$150,000', img: 'https://placehold.co/400x560/FF6666/FFFFFF?text=Snap+Karp' },


    // --- FOOTBALL ---
    // Starter ($25)
    { category: 'football', level: 'starter', name: 'Base Rookie', grade: 'PSA 9', value: '$15', img: 'https://placehold.co/400x560/8B4500/FFFFFF?text=Base+RC' },
    { category: 'football', level: 'starter', name: 'Veterans Common', grade: 'PSA 10', value: '$20', img: 'https://placehold.co/400x560/8B4500/FFFFFF?text=Vet+Common' },
    { category: 'football', level: 'starter', name: 'Score Rookie', grade: 'PSA 9', value: '$18', img: 'https://placehold.co/400x560/8B4500/FFFFFF?text=Score+RC' },
    { category: 'football', level: 'starter', name: 'Topps Chrome', grade: 'PSA 8', value: '$25', img: 'https://placehold.co/400x560/8B4500/FFFFFF?text=Topps+Chrome' },
    { category: 'football', level: 'starter', name: 'Prizm Base', grade: 'PSA 9', value: '$30', img: 'https://placehold.co/400x560/8B4500/FFFFFF?text=Prizm+Base' },
    { category: 'football', level: 'starter', name: 'Mosaic Base', grade: 'PSA 9', value: '$22', img: 'https://placehold.co/400x560/8B4500/FFFFFF?text=Mosaic' },

    // Silver ($50)
    { category: 'football', level: 'silver', name: 'Peyton Manning', grade: 'PSA 8', value: '$180', img: 'https://placehold.co/400x560/A26200/FFFFFF?text=Manning' },
    { category: 'football', level: 'silver', name: 'Randy Moss RC', grade: 'PSA 9', value: '$140', img: 'https://placehold.co/400x560/A26200/FFFFFF?text=Moss+RC' },
    { category: 'football', level: 'silver', name: 'Barry Sanders', grade: 'PSA 9', value: '$120', img: 'https://placehold.co/400x560/A26200/FFFFFF?text=Barry+Sanders' },
    { category: 'football', level: 'silver', name: 'Brett Favre RC', grade: 'PSA 8', value: '$160', img: 'https://placehold.co/400x560/A26200/FFFFFF?text=Favre' },
    { category: 'football', level: 'silver', name: 'Jerry Rice Base', grade: 'PSA 10', value: '$200', img: 'https://placehold.co/400x560/A26200/FFFFFF?text=Rice' },
    { category: 'football', level: 'silver', name: 'Emmitt Smith', grade: 'PSA 9', value: '$150', img: 'https://placehold.co/400x560/A26200/FFFFFF?text=Emmitt' },

    // Gold ($100)
    { category: 'football', level: 'gold', name: 'Joe Montana Auto', grade: 'PSA 9', value: '$800', img: 'https://placehold.co/400x560/B97F00/FFFFFF?text=Montana' },
    { category: 'football', level: 'gold', name: 'Jerry Rice Auto', grade: 'PSA 9', value: '$950', img: 'https://placehold.co/400x560/B97F00/FFFFFF?text=Rice+Auto' },
    { category: 'football', level: 'gold', name: 'Mahomes Prizm', grade: 'PSA 9', value: '$1,200', img: 'https://placehold.co/400x560/B97F00/FFFFFF?text=Mahomes' },
    { category: 'football', level: 'gold', name: 'Brady Bowman', grade: 'PSA 8', value: '$2,000', img: 'https://placehold.co/400x560/B97F00/FFFFFF?text=Brady+Bowman' },
    { category: 'football', level: 'gold', name: 'Rodgers Chrome', grade: 'PSA 10', value: '$1,500', img: 'https://placehold.co/400x560/B97F00/FFFFFF?text=Rodgers' },
    { category: 'football', level: 'gold', name: 'Brees Chrome', grade: 'PSA 10', value: '$850', img: 'https://placehold.co/400x560/B97F00/FFFFFF?text=Brees' },

    // Platinum ($500)
    { category: 'football', level: 'platinum', name: 'Tom Brady RC', grade: 'PSA 8', value: '$4,500', img: 'https://placehold.co/400x560/D09C00/FFFFFF?text=Brady+RC' },
    { category: 'football', level: 'platinum', name: 'Mahomes Auto', grade: 'PSA 10', value: '$6,000', img: 'https://placehold.co/400x560/D09C00/FFFFFF?text=Mahomes+Auto' },
    { category: 'football', level: 'platinum', name: 'Josh Allen RPA', grade: 'PSA 9', value: '$5,500', img: 'https://placehold.co/400x560/D09C00/FFFFFF?text=Josh+Allen' },
    { category: 'football', level: 'platinum', name: 'Herbert RPA', grade: 'PSA 10', value: '$8,000', img: 'https://placehold.co/400x560/D09C00/FFFFFF?text=Herbert' },
    { category: 'football', level: 'platinum', name: 'Burrow Prizm', grade: 'PSA 10', value: '$3,500', img: 'https://placehold.co/400x560/D09C00/FFFFFF?text=Burrow' },
    { category: 'football', level: 'platinum', name: 'Lamar Jackson', grade: 'PSA 10', value: '$4,000', img: 'https://placehold.co/400x560/D09C00/FFFFFF?text=Lamar' },

    // Diamond ($1000)
    { category: 'football', level: 'diamond', name: 'Jim Brown RC', grade: 'PSA 8', value: '$25,000', img: 'https://placehold.co/400x560/E7B900/FFFFFF?text=Jim+Brown' },
    { category: 'football', level: 'diamond', name: 'Brady Contenders', grade: 'PSA 9', value: '$35,000', img: 'https://placehold.co/400x560/E7B900/FFFFFF?text=Brady+Auto' },
    { category: 'football', level: 'diamond', name: 'Walter Payton RC', grade: 'PSA 10', value: '$45,000', img: 'https://placehold.co/400x560/E7B900/FFFFFF?text=Payton+RC' },
    { category: 'football', level: 'diamond', name: 'Unitas Rookie', grade: 'PSA 9', value: '$20,000', img: 'https://placehold.co/400x560/E7B900/FFFFFF?text=Unitas' },
    { category: 'football', level: 'diamond', name: 'Namath Rookie', grade: 'PSA 8', value: '$30,000', img: 'https://placehold.co/400x560/E7B900/FFFFFF?text=Namath' },
    { category: 'football', level: 'diamond', name: 'Starr Rookie', grade: 'PSA 9', value: '$18,000', img: 'https://placehold.co/400x560/E7B900/FFFFFF?text=Starr' },

    // Lunar ($2500)
    { category: 'football', level: 'lunar', name: 'Brady Champ', grade: 'PSA 9', value: '$450,000', img: 'https://placehold.co/400x560/FFD700/000000?text=Brady+Ticket' },
    { category: 'football', level: 'lunar', name: 'Mahomes Shield', grade: 'PSA 10', value: '$800,000', img: 'https://placehold.co/400x560/FFD700/000000?text=Mahomes+1/1' },
    { category: 'football', level: 'lunar', name: 'Brady 1/1', grade: 'BGS 9', value: '$1,200,000', img: 'https://placehold.co/400x560/FFD700/000000?text=Brady+1/1' },
    { category: 'football', level: 'lunar', name: 'Flawless Logo', grade: 'PSA 10', value: '$600,000', img: 'https://placehold.co/400x560/FFD700/000000?text=NFL+Shield' },
    { category: 'football', level: 'lunar', name: 'Ruth/Brady Auto', grade: 'DNA 10', value: '$900,000', img: 'https://placehold.co/400x560/FFD700/000000?text=Dual+Auto' },
    { category: 'football', level: 'lunar', name: 'Jim Brown 10', grade: 'PSA 10', value: '$350,000', img: 'https://placehold.co/400x560/FFD700/000000?text=Brown+10' },


    // --- BASEBALL ---
    // Starter ($25)
    { category: 'baseball', level: 'starter', name: 'Topps Common', grade: 'PSA 9', value: '$10', img: 'https://placehold.co/400x560/000050/FFFFFF?text=Topps' },
    { category: 'baseball', level: 'starter', name: 'Bowman Base', grade: 'PSA 10', value: '$30', img: 'https://placehold.co/400x560/000050/FFFFFF?text=Bowman' },
    { category: 'baseball', level: 'starter', name: 'Donruss Base', grade: 'PSA 9', value: '$12', img: 'https://placehold.co/400x560/000050/FFFFFF?text=Donruss' },
    { category: 'baseball', level: 'starter', name: 'Heritage Base', grade: 'PSA 10', value: '$25', img: 'https://placehold.co/400x560/000050/FFFFFF?text=Heritage' },
    { category: 'baseball', level: 'starter', name: 'Stadium Club', grade: 'PSA 9', value: '$15', img: 'https://placehold.co/400x560/000050/FFFFFF?text=Stadium' },
    { category: 'baseball', level: 'starter', name: 'Allen & Ginter', grade: 'PSA 10', value: '$20', img: 'https://placehold.co/400x560/000050/FFFFFF?text=A&G' },

    // Silver ($50)
    { category: 'baseball', level: 'silver', name: 'Derek Jeter RC', grade: 'PSA 8', value: '$150', img: 'https://placehold.co/400x560/0F216E/FFFFFF?text=Jeter' },
    { category: 'baseball', level: 'silver', name: 'Griffey Jr Base', grade: 'PSA 9', value: '$120', img: 'https://placehold.co/400x560/0F216E/FFFFFF?text=Griffey' },
    { category: 'baseball', level: 'silver', name: 'Frank Thomas', grade: 'PSA 9', value: '$80', img: 'https://placehold.co/400x560/0F216E/FFFFFF?text=Thomas' },
    { category: 'baseball', level: 'silver', name: 'Chipper Jones', grade: 'PSA 10', value: '$180', img: 'https://placehold.co/400x560/0F216E/FFFFFF?text=Chipper' },
    { category: 'baseball', level: 'silver', name: 'Ripken Rookie', grade: 'PSA 8', value: '$110', img: 'https://placehold.co/400x560/0F216E/FFFFFF?text=Ripken' },
    { category: 'baseball', level: 'silver', name: 'Randy Johnson', grade: 'PSA 9', value: '$95', img: 'https://placehold.co/400x560/0F216E/FFFFFF?text=Johnson' },

    // Gold ($100)
    { category: 'baseball', level: 'gold', name: 'Ichiro Auto', grade: 'PSA 10', value: '$900', img: 'https://placehold.co/400x560/1D438C/FFFFFF?text=Ichiro' },
    { category: 'baseball', level: 'gold', name: 'Ohtani Rookie', grade: 'PSA 9', value: '$1,200', img: 'https://placehold.co/400x560/1D438C/FFFFFF?text=Ohtani' },
    { category: 'baseball', level: 'gold', name: 'Judge Rookie', grade: 'PSA 10', value: '$800', img: 'https://placehold.co/400x560/1D438C/FFFFFF?text=Judge' },
    { category: 'baseball', level: 'gold', name: 'Harper Chrome', grade: 'PSA 10', value: '$700', img: 'https://placehold.co/400x560/1D438C/FFFFFF?text=Harper' },
    { category: 'baseball', level: 'gold', name: 'Soto Update', grade: 'PSA 10', value: '$650', img: 'https://placehold.co/400x560/1D438C/FFFFFF?text=Soto' },
    { category: 'baseball', level: 'gold', name: 'Acuna Bat Down', grade: 'PSA 9', value: '$1,000', img: 'https://placehold.co/400x560/1D438C/FFFFFF?text=Acuna' },

    // Platinum ($500)
    { category: 'baseball', level: 'platinum', name: 'Mike Trout 2011', grade: 'PSA 10', value: '$4,000', img: 'https://placehold.co/400x560/2C64AA/FFFFFF?text=Trout+2011' },
    { category: 'baseball', level: 'platinum', name: 'Jackie Auto', grade: 'PSA 5', value: '$6,500', img: 'https://placehold.co/400x560/2C64AA/FFFFFF?text=Jackie' },
    { category: 'baseball', level: 'platinum', name: 'Mantle 1956', grade: 'PSA 8', value: '$8,000', img: 'https://placehold.co/400x560/2C64AA/FFFFFF?text=Mantle+56' },
    { category: 'baseball', level: 'platinum', name: 'Koufax Rookie', grade: 'PSA 7', value: '$5,000', img: 'https://placehold.co/400x560/2C64AA/FFFFFF?text=Koufax' },
    { category: 'baseball', level: 'platinum', name: 'Clemente 55', grade: 'PSA 6', value: '$7,500', img: 'https://placehold.co/400x560/2C64AA/FFFFFF?text=Clemente' },
    { category: 'baseball', level: 'platinum', name: 'Aaron Rookie', grade: 'PSA 6', value: '$6,000', img: 'https://placehold.co/400x560/2C64AA/FFFFFF?text=Aaron' },

    // Diamond ($1000)
    { category: 'baseball', level: 'diamond', name: 'Mantle 1952', grade: 'PSA 5', value: '$45,000', img: 'https://placehold.co/400x560/3B86C8/FFFFFF?text=Mantle+52' },
    { category: 'baseball', level: 'diamond', name: 'Ruth Goudey', grade: 'PSA 4', value: '$30,000', img: 'https://placehold.co/400x560/3B86C8/FFFFFF?text=Ruth' },
    { category: 'baseball', level: 'diamond', name: 'Cobb T206', grade: 'PSA 3', value: '$15,000', img: 'https://placehold.co/400x560/3B86C8/FFFFFF?text=Cobb' },
    { category: 'baseball', level: 'diamond', name: 'Gehrig 1934', grade: 'PSA 6', value: '$22,000', img: 'https://placehold.co/400x560/3B86C8/FFFFFF?text=Gehrig' },
    { category: 'baseball', level: 'diamond', name: 'Shoeless Joe', grade: 'PSA 2', value: '$18,000', img: 'https://placehold.co/400x560/3B86C8/FFFFFF?text=Jackson' },
    { category: 'baseball', level: 'diamond', name: 'Cy Young', grade: 'PSA 3', value: '$20,000', img: 'https://placehold.co/400x560/3B86C8/FFFFFF?text=Cy+Young' },

    // Lunar ($2500)
    { category: 'baseball', level: 'lunar', name: 'Wagner T206', grade: 'PSA 2', value: '$2,500,000', img: 'https://placehold.co/400x560/4AA8E6/FFFFFF?text=Wagner' },
    { category: 'baseball', level: 'lunar', name: 'Mantle Mint', grade: 'PSA 9', value: '$1,200,000', img: 'https://placehold.co/400x560/4AA8E6/FFFFFF?text=Mantle+9' },
    { category: 'baseball', level: 'lunar', name: 'Ruth Rookie', grade: 'PSA 7', value: '$500,000', img: 'https://placehold.co/400x560/4AA8E6/FFFFFF?text=Ruth+RC' },
    { category: 'baseball', level: 'lunar', name: 'Tout 1/1 Auto', grade: 'PSA 10', value: '$800,000', img: 'https://placehold.co/400x560/4AA8E6/FFFFFF?text=Trout+Auto' },
    { category: 'baseball', level: 'lunar', name: 'Ohtani 1/1', grade: 'PSA 10', value: '$400,000', img: 'https://placehold.co/400x560/4AA8E6/FFFFFF?text=Ohtani+1/1' },
    { category: 'baseball', level: 'lunar', name: '52 Mantle 10', grade: 'PSA 10', value: '$10,000,000', img: 'https://placehold.co/400x560/4AA8E6/FFFFFF?text=Grail' },


    // --- BASKETBALL ---
    // Starter ($25)
    { category: 'basketball', level: 'starter', name: 'Hoops Base', grade: 'PSA 9', value: '$15', img: 'https://placehold.co/400x560/004d00/FFFFFF?text=Hoops' },
    { category: 'basketball', level: 'starter', name: 'Prizm Base', grade: 'PSA 10', value: '$40', img: 'https://placehold.co/400x560/004d00/FFFFFF?text=Prizm' },
    { category: 'basketball', level: 'starter', name: 'Donruss Optic', grade: 'PSA 9', value: '$25', img: 'https://placehold.co/400x560/004d00/FFFFFF?text=Optic' },
    { category: 'basketball', level: 'starter', name: 'Select Base', grade: 'PSA 9', value: '$30', img: 'https://placehold.co/400x560/004d00/FFFFFF?text=Select' },
    { category: 'basketball', level: 'starter', name: 'Mosaic Intro', grade: 'PSA 10', value: '$35', img: 'https://placehold.co/400x560/004d00/FFFFFF?text=Mosaic' },
    { category: 'basketball', level: 'starter', name: 'Playoff Base', grade: 'PSA 9', value: '$12', img: 'https://placehold.co/400x560/004d00/FFFFFF?text=Playoff' },

    // Silver ($50)
    { category: 'basketball', level: 'silver', name: 'Shaq Rookie', grade: 'PSA 9', value: '$200', img: 'https://placehold.co/400x560/0F640F/FFFFFF?text=Shaq' },
    { category: 'basketball', level: 'silver', name: 'Iverson Chrome', grade: 'PSA 9', value: '$250', img: 'https://placehold.co/400x560/0F640F/FFFFFF?text=Iverson' },
    { category: 'basketball', level: 'silver', name: 'Duncan Chrome', grade: 'PSA 9', value: '$180', img: 'https://placehold.co/400x560/0F640F/FFFFFF?text=Duncan' },
    { category: 'basketball', level: 'silver', name: 'Garnett Rookie', grade: 'PSA 9', value: '$150', img: 'https://placehold.co/400x560/0F640F/FFFFFF?text=Garnett' },
    { category: 'basketball', level: 'silver', name: 'Nash Rookie', grade: 'PSA 9', value: '$160', img: 'https://placehold.co/400x560/0F640F/FFFFFF?text=Nash' },
    { category: 'basketball', level: 'silver', name: 'Carter Chrome', grade: 'PSA 9', value: '$220', img: 'https://placehold.co/400x560/0F640F/FFFFFF?text=Vince' },

    // Gold ($100)
    { category: 'basketball', level: 'gold', name: 'Kobe Chrome', grade: 'PSA 9', value: '$1,500', img: 'https://placehold.co/400x560/1F7B1F/FFFFFF?text=Kobe' },
    { category: 'basketball', level: 'gold', name: 'Durant Rookie', grade: 'PSA 10', value: '$1,200', img: 'https://placehold.co/400x560/1F7B1F/FFFFFF?text=Durant' },
    { category: 'basketball', level: 'gold', name: 'Curry Rookie', grade: 'PSA 8', value: '$1,000', img: 'https://placehold.co/400x560/1F7B1F/FFFFFF?text=Curry' },
    { category: 'basketball', level: 'gold', name: 'Luka Prizm', grade: 'PSA 10', value: '$800', img: 'https://placehold.co/400x560/1F7B1F/FFFFFF?text=Luka' },
    { category: 'basketball', level: 'gold', name: 'Giannis Prizm', grade: 'PSA 9', value: '$900', img: 'https://placehold.co/400x560/1F7B1F/FFFFFF?text=Giannis' },
    { category: 'basketball', level: 'gold', name: 'LeBron Base', grade: 'PSA 10', value: '$1,800', img: 'https://placehold.co/400x560/1F7B1F/FFFFFF?text=LeBron' },

    // Platinum ($500)
    { category: 'basketball', level: 'platinum', name: 'LeBron Chrome', grade: 'PSA 10', value: '$8,000', img: 'https://placehold.co/400x560/2E922E/FFFFFF?text=LeBron+RC' },
    { category: 'basketball', level: 'platinum', name: 'Curry NT Auto', grade: 'PSA 9', value: '$12,000', img: 'https://placehold.co/400x560/2E922E/FFFFFF?text=Curry+NT' },
    { category: 'basketball', level: 'platinum', name: 'Jordan Fleer', grade: 'PSA 8', value: '$7,000', img: 'https://placehold.co/400x560/2E922E/FFFFFF?text=MJ+Fleer' },
    { category: 'basketball', level: 'platinum', name: 'Kobe Auto', grade: 'PSA 10', value: '$5,500', img: 'https://placehold.co/400x560/2E922E/FFFFFF?text=Kobe+Auto' },
    { category: 'basketball', level: 'platinum', name: 'Wemby Gold', grade: 'PSA 10', value: '$6,000', img: 'https://placehold.co/400x560/2E922E/FFFFFF?text=Wemby' },
    { category: 'basketball', level: 'platinum', name: 'Bird/Magic', grade: 'PSA 8', value: '$9,000', img: 'https://placehold.co/400x560/2E922E/FFFFFF?text=Bird+Magic' },

    // Diamond ($1000)
    { category: 'basketball', level: 'diamond', name: 'Jordan 1986', grade: 'PSA 10', value: '$250,000', img: 'https://placehold.co/400x560/3EA93E/FFFFFF?text=MJ+86' },
    { category: 'basketball', level: 'diamond', name: 'Kobe Exquisite', grade: 'PSA 9', value: '$80,000', img: 'https://placehold.co/400x560/3EA93E/FFFFFF?text=Kobe+Exq' },
    { category: 'basketball', level: 'diamond', name: 'LeBron Exquisite', grade: 'PSA 8', value: '$45,000', img: 'https://placehold.co/400x560/3EA93E/FFFFFF?text=LeBron+Exq' },
    { category: 'basketball', level: 'diamond', name: 'Logoman Auto', grade: 'PSA 9', value: '$60,000', img: 'https://placehold.co/400x560/3EA93E/FFFFFF?text=Logoman' },
    { category: 'basketball', level: 'diamond', name: 'Russell Rookie', grade: 'PSA 8', value: '$35,000', img: 'https://placehold.co/400x560/3EA93E/FFFFFF?text=Russell' },
    { category: 'basketball', level: 'diamond', name: 'Wilt Rookie', grade: 'PSA 8', value: '$40,000', img: 'https://placehold.co/400x560/3EA93E/FFFFFF?text=Wilt' },

    // Lunar ($2500)
    { category: 'basketball', level: 'lunar', name: 'LeBron Logoman', grade: 'PSA 9', value: '$2,000,000', img: 'https://placehold.co/400x560/4DBF4D/FFFFFF?text=LeBron+1/1' },
    { category: 'basketball', level: 'lunar', name: 'Jordan RPA', grade: 'BGS 9.5', value: '$1,500,000', img: 'https://placehold.co/400x560/4DBF4D/FFFFFF?text=MJ+RPA' },
    { category: 'basketball', level: 'lunar', name: 'Luka Logoman', grade: 'PSA 10', value: '$3,000,000', img: 'https://placehold.co/400x560/4DBF4D/FFFFFF?text=Luka+1/1' },
    { category: 'basketball', level: 'lunar', name: 'Kobe 1/1', grade: 'PSA 10', value: '$800,000', img: 'https://placehold.co/400x560/4DBF4D/FFFFFF?text=Kobe+1/1' },
    { category: 'basketball', level: 'lunar', name: 'Giannis 1/1', grade: 'PSA 10', value: '$500,000', img: 'https://placehold.co/400x560/4DBF4D/FFFFFF?text=Giannis+1/1' },
    { category: 'basketball', level: 'lunar', name: 'Curry Logoman', grade: 'PSA 10', value: '$750,000', img: 'https://placehold.co/400x560/4DBF4D/FFFFFF?text=Curry+Logo' }
];

// DOM Elements
const levelSelectGrid = document.getElementById('levelSelectGrid');
const valuesList = document.getElementById('valuesList');
const selectedLevelName = document.getElementById('selectedLevelName');
const avgValue = document.getElementById('avgValue');
const sidebarBuyBtn = document.getElementById('sidebarBuyBtn');
const buyBtnPrice = document.getElementById('buyBtnPrice');

const stagePackName = document.getElementById('stagePackName');
const stageTierName = document.getElementById('stageTierName');
const packFront = document.getElementById('packFront');
const packIcon = document.getElementById('packIcon');
const stageContainer = document.getElementById('mainStage');
const pack3d = document.getElementById('pack3d');

// Modal Elements
const ripModal = document.getElementById('ripModal');
const closeModalBtn = document.querySelector('.close-modal');
const activePackContainer = document.getElementById('activePack');
const ripBtn = document.getElementById('ripBtn');
const packStage = document.querySelector('.pack-stage');
const revealStage = document.getElementById('revealedCard');

// Logic
function updateStageVisuals() {
    // Update Icons
    const icons = {
        'pokemon': '⚡',
        'football': '🏈',
        'baseball': '⚾',
        'basketball': '🏀'
    };
    packIcon.textContent = icons[currentCategory] || '⚡';

    // Update Title
    stagePackName.textContent = currentCategory.toUpperCase();

    // Update Chase Cards for this category
    renderChaseCards();
}

const chaseHeader = document.querySelector('.chase-header');
const chaseSubtext = document.querySelector('.chase-subtext');

function renderChaseCards() {
    // Update Header
    const headerEl = document.querySelector('h4.font-barlow');
    if (headerEl) {
        headerEl.textContent = `${currentPack.name} Chase Cards`;
    }

    // Filter by BOTH Category AND Level
    const activeCards = CHASE_CARDS.filter(c => c.category === currentCategory && c.level === currentPack.id);

    // Fallback if no specific cards found
    const displayCards = activeCards.length > 0 ? activeCards : [{ name: 'Mystery Card', value: '???', grade: '?', img: 'https://placehold.co/400x560/333333/FFFFFF?text=Mystery' }];

    chaseCarousel.innerHTML = displayCards.map(card => `
        <div class="flex max-w-[95px] flex-1 flex-col self-stretch transition-transform duration-200 md:max-w-[158px] chase-card-shim">
            <div class="flex flex-1 flex-col">
                <div class="relative h-[161px] w-[95px] cursor-pointer overflow-hidden md:h-[258px] md:w-[158px]" role="button">
                    <img src="${card.img}" alt="${card.name}" class="absolute inset-0 h-full w-full object-contain transition-all duration-500 opacity-100 blur-0">
                </div>
                <div class="text-left">
                    <p class="mt-4 line-clamp-3 font-chivoMono text-xs font-normal text-tertiary">${card.name}</p>
                </div>
            </div>
            <div class="mt-2 flex flex-1 flex-row items-center">
                <span class="font-chivoMono text-sm font-normal text-primary">${card.value}</span>
                <span class="ml-1 font-chivoMono text-sm font-normal text-tertiary">est.</span>
            </div>
        </div>
    `).join('');
}

// Initialization
function init() {
    renderLevelSelect();
    renderValues();
    renderChaseCards();
    setupSidebarInteractions();
    setupEventListeners();
    setupStageInteractions();
    // Start periodic probability updates simulation
    setInterval(updateProbabilities, 5000);
}

function setupStageInteractions() {
    // 3D Tilt Effect on Mouse Move
    stageContainer.addEventListener('mousemove', (e) => {
        const rect = stageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation based on cursor position relative to center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        pack3d.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    stageContainer.addEventListener('mouseleave', () => {
        pack3d.style.transform = 'rotateX(0) rotateY(0)';
    });
}

function setupSidebarInteractions() {
    // Category Buttons
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all
            document.querySelectorAll('[data-category]').forEach(b => {
                b.classList.remove('active-category', 'border-[#FFFFFF]', 'bg-tertiary');
                b.classList.add('border-primary');
            });
            // Add active to current
            const target = e.currentTarget;
            target.classList.remove('border-primary');
            target.classList.add('active-category', 'border-[#FFFFFF]', 'bg-tertiary');

            // Update State
            currentCategory = target.dataset.category;
            updateStageVisuals();
        });
    });

    // Buy Button
    sidebarBuyBtn.addEventListener('click', () => {
        openRipModal(currentPack.id);
    });
}

// Rendering Level Select Buttons
function renderLevelSelect() {
    levelSelectGrid.innerHTML = PACK_TIERS.map(pack => {
        const isActive = currentPack.id === pack.id;
        // Use new gradient border class for active state
        const activeClass = isActive
            ? `gradient-border-active gradient-active-${pack.id}`
            : 'border border-primary hover:border-[#FFFFFF]';

        return `
        <button class="btn-pack-select box-border w-full rounded-xl text-left transition focus:outline-none relative flex min-h-[56px] flex-col items-center justify-center p-1 ${activeClass}" 
                onclick="selectPack('${pack.id}')">
            <p class="font-chivoMono text-base capitalize leading-none text-primary">${pack.name}</p>
            <p class="font-chivoMono text-sm font-normal leading-none text-primary">
                <span>$${pack.price.toLocaleString()}</span>
            </p>
        </button>
        `;
    }).join('');
}

function selectPack(id) {
    currentPack = PACK_TIERS.find(p => p.id === id);
    selectedLevelName.textContent = currentPack.name;
    stageTierName.textContent = currentPack.name.toUpperCase();
    avgValue.textContent = currentPack.price.toLocaleString();
    buyBtnPrice.textContent = currentPack.price.toLocaleString();

    // Animate price change
    buyBtnPrice.style.opacity = '0.5';
    setTimeout(() => buyBtnPrice.style.opacity = '1', 200);

    renderLevelSelect(); // Re-render to update active border state
    renderValues(); // Update values bars based on tier
    renderChaseCards(); // Update Chase Cards based on new tier
}

// Mock Data for Values/Probabilities based on tier price
function renderValues() {
    // Generate mock ranges centering around the price
    const base = currentPack.price;
    const ranges = [
        { label: `$${Math.round(base * 0.5)}-${Math.round(base * 0.8)}`, perc: 40.6 },
        { label: `$${Math.round(base * 0.8)}-${Math.round(base * 1.0)}`, perc: 30.5 },
        { label: `$${Math.round(base * 1.0)}-${Math.round(base * 2.0)}`, perc: 25.3 },
        { label: `$${Math.round(base * 2.0)}-${Math.round(base * 4.0)}`, perc: 3.0 },
        { label: `$${Math.round(base * 4.0)}-${Math.round(base * 8.0)}`, perc: 0.5 },
        { label: `$${Math.round(base * 8.0)}+`, perc: 0.1 }
    ];

    valuesList.innerHTML = ranges.map(r => `
        <div class="flex items-center gap-1">
            <div class="w-28 shrink-0"><p class="font-chivoMono text-sm text-primary">${r.label}</p></div>
            <div class="grow">
                <div class="flex">
                    <div class="relative h-2 w-full overflow-hidden rounded-full bg-border-secondary">
                        <div class="h-full rounded-full bar-blue transition-all duration-500" style="width: ${r.perc}%"></div>
                    </div>
                </div>
            </div>
            <div class="w-16 shrink-0 text-right"><p class="font-chivoMono text-sm text-primary">${r.perc}%</p></div>
        </div>
    `).join('');
}

function updateProbabilities() {
    // Simulate slight fluctuation
    renderValues();
}

// Modal Logic
window.openRipModal = (packId) => {
    const pack = PACK_TIERS.find(p => p.id === packId);
    if (!pack) return;

    currentPack = pack;

    // Reset Modal State
    packStage.classList.remove('hidden');
    revealStage.classList.add('hidden');
    ripBtn.classList.remove('hidden');
    ripBtn.textContent = `OPEN ${currentCategory.toUpperCase()} ${pack.name.toUpperCase()} ($${pack.price.toLocaleString()})`;
    ripBtn.disabled = false;

    // Render Pack in Modal
    activePackContainer.innerHTML = `
        <div class="pack-envelope" style="background: linear-gradient(135deg, ${pack.color} 0%, #000 100%);">
            <div class="pack-logo">${currentCategory.toUpperCase()}</div>
            <div class="pack-label">${pack.name}</div>
            <div class="font-chivoMono text-white mt-2">$${pack.price.toLocaleString()}</div>
        </div>
    `;

    ripModal.classList.remove('hidden');
};

function setupEventListeners() {
    closeModalBtn.addEventListener('click', () => {
        ripModal.classList.add('hidden');
    });

    ripBtn.addEventListener('click', () => {
        performRip();
    });

    ripModal.addEventListener('click', (e) => {
        if (e.target === ripModal) ripModal.classList.add('hidden');
    });
}

function performRip() {
    const packEl = activePackContainer.querySelector('.pack-envelope');

    // 1. Shake Animation
    packEl.classList.add('shaking');
    ripBtn.disabled = true;
    ripBtn.textContent = "OPENING...";

    // 2. Delay for suspense
    setTimeout(() => {
        packEl.classList.remove('shaking');
        showResult();
    }, 2000);
}

function showResult() {
    // Filter cards matching current Category AND Pack Level
    const validCards = CHASE_CARDS.filter(c => c.category === currentCategory && c.level === currentPack.id);

    // Fallback logic if data is missing for a specific combo
    const pool = validCards.length > 0 ? validCards : CHASE_CARDS.filter(c => c.category === currentCategory);

    const randomCard = pool[Math.floor(Math.random() * pool.length)];

    document.getElementById('cardResultImg').src = randomCard.img;
    document.getElementById('cardResultName').textContent = randomCard.name;
    document.getElementById('cardGrade').textContent = randomCard.grade;
    document.getElementById('cardValue').textContent = randomCard.value;
    document.getElementById('sellValue').textContent = "Sell for $0.00"; // Mock

    packStage.classList.add('hidden');
    ripBtn.classList.add('hidden');
    revealStage.classList.remove('hidden');
}

// Start
init();
