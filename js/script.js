// ====================== COLLECTION VERSIONS ======================
const collectionVersions = [
  { version: "v4.2.0", date: "29.03.2026", file: "https://drive.google.com/file/d/1PWQM4fC2Rwnbmr6mFG2Chvbk4w3wFXPg/view?usp=drive_link" },
];

const versionsContainer = document.getElementById("old-versions");
if (versionsContainer) {
  collectionVersions.forEach(v => {
    const div = document.createElement("div");
    div.className = "version-row";
    div.innerHTML = `
      <span class="version-tag">${v.version}</span>
      <span class="version-date">${v.date}</span>
      <a href="${v.file}" class="download-btn">Download</a>
    `;
    versionsContainer.appendChild(div);
  });
}

// ====================== ALBUMS ARRAY ======================
const albums = [
  {
    id: "millions-of-dead-cops",
    title: "Millions Of Dead Cops",
    artist: "MDC",
    year: 1982,
    genre: "Hardcore Punk",
    city: "Austin, TX",
    label: "R Radical Records",
    img: "img/Mc001.jpg",
    download: "https://drive.google.com/file/d/17F3-V0l_sjmJ9tzS9gZwQapba_iPEK_J/view?usp=drive_link",
    tracks: [
      "Business on Parade", "Dead Cops / America's So Straight", "Born to Die",
      "Corporate Deathburger", "Violent Rednecks", "I Remember", "John Wayne was a Nazi",
      "Dick for Brains", "I Hate Work", "My Family is a Little Weird", "Greedy & Pathetic",
      "Church & State", "Kill the Light", "American Achievements"
    ]
  },
  {
    id: "smoke-signals",
    title: "Smoke Signals",
    artist: "MDC",
    year: 1986,
    genre: "Hardcore Punk",
    city: "San Francisco, CA",
    label: "R Radical Records",
    img: "img/Mc002.jpg",
    download: "https://drive.google.com/file/d/1gq9GsFjwc_QHnBq6sScHCT_0JrWCwH5n/view?usp=drive_link",
    tracks: [
      "No More Cops", "King of Thrash", "Drink to Forget", "The Big Picture",
      "Skateboards from Hell", "Tofutti!", "South Africa Is Free", "Acceptable Risks",
      "Missle Destroyed Civilization", "Soup Kitchen Celebrity", "Country Squawk",
      "Paradise Lost", "Smoke Signals"
    ]
  },
  {
    id: "metal-devil-cokes",
    title: "Metal Devil Cokes",
    artist: "MDC",
    year: 1989,
    genre: "Hardcore Punk",
    city: "San Francisco, CA",
    label: "R Radical Records",
    img: "img/Mc003.jpg",
    download: "https://drive.google.com/file/d/1o9N_mo7eZwgXJTQV2MMojtCtukhSB4V0/view?usp=drive_link",
    tracks: [
      "Huddled Masses", "Dirty Harry For President", "White Men In Suits", "Three White Mice",
      "Tofu Spaghetti", "Snuffed Out", "Deep In The Heart", "Acid Reindeer",
      "I Was A Dupe For The Rcp", "Metal Devil Cokes", "Hole In My Soul", "Knucklehead",
      "Aint It Funny", "Mongoloid", "Love Potion No9", "Something For Everyone"
    ]
  },
  {
    id: "hey-cop-if-i-had-a-face-like-yours",
    title: "Hey Cop!! If I Had A Face Like Yours…",
    artist: "MDC",
    year: 1991,
    genre: "Hardcore Punk",
    city: "San Francisco, CA",
    label: "R Radical Records",
    img: "img/Mc004.jpg",
    download: "https://drive.google.com/file/d/1FumRPdnTHy7ibdmLR4VWNfJcduYWCm4R/view?usp=drive_link",
    tracks: [
      "Millions Of Dead Cops", "Mark Of The Farmer", "U.S War #54", "Gig And Die In L.A",
      "Beat Somebosy Up", "Nowhere To Go", "I Do Not Wish", "If I Had A Face",
      "It's Later Than You Think", "Lambada Me", "The Jew That Got Away", "Moneypile",
      "Cockrocker", "Crime Of Rape", "Black Christmas"
    ]
  },
  {
    id: "walk-among-us",
    title: "Walk Among Us",
    artist: "Misfits",
    year: 1982,
    genre: "Horror Punk",
    city: "Lodi, NJ",
    label: "Ruby Records",
    img: "img/Mc005.jpg",
    download: "https://drive.google.com/file/d/1wA5ne-bXmEmlMWdcKvZwvldi7s44TeU_/view?usp=drive_link",
    tracks: [
      "20 Eyes", "All Hell Breaks Loose", "Astro Zombies", "Braineaters", "Devils Whorehouse",
      "Hatebreeders", "I Turned Into A Martian", "Mommy, Can I Go Out & Kill Tonight? (Live)",
      "Night Of The Living Dead", "Nike A Go Go", "Skulls", "Vampira", "Violent World"
    ]
  },
  {
    id: "earth-ad-wolfs-blood",
    title: "Earth A.D. / Wolfs Blood",
    artist: "Misfits",
    year: 1983,
    genre: "Horror Punk",
    city: "Lodi, NJ",
    label: "Plan 9 Records",
    img: "img/Mc006.jpg",
    download: "https://drive.google.com/file/d/1yuaM5OgB-MzxrQCv_UsBvStjvyJ5qDc1/view?usp=drive_link",
    tracks: [
      "Bloodfeast", "Death Comes Ripping", "Demonomania", "Devilock", "Die, Die My Darling",
      "Earth A.D.", "Green Hell", "Hellhound", "Mommy, Can I Go Out & Kill Tonight?",
      "Queen Wasp", "We Bite", "Wolf's Blood"
    ]
  },
  {
    id: "static-age",
    title: "Static Age",
    artist: "Misfits",
    year: 1996,
    genre: "Horror Punk",
    city: "Lodi, NJ",
    label: "Caroline Records",
    img: "img/Mc008.jpg",
    download: "https://drive.google.com/file/d/19qRFC3YtxueH40xCZ9bBh0kf9Iy9dkQP/view?usp=drive_link",
    tracks: [
      "Static Age", "TV Casualty", "Some Kinda Hate", "Last Caress", "Return Of The Fly",
      "Hybrid Moments", "We Are 138", "Teenagers From Mars", "Come Back", "Angelfuck",
      "Hollywood Babylon", "Attitude", "Bullet", "Theme For A Jackal", "She",
      "Spinal Remains", "In The Doorway"
    ]
  },
  {
    id: "something-better-change",
    title: "Something Better Change",
    artist: "DOA",
    year: 1980,
    genre: "Hardcore Punk",
    city: "Vancouver, BC",
    label: "Sudden Death Records",
    img: "img/Mc010.jpg",
    download: "https://drive.google.com/file/d/1_RuokmQBIglD0n9chlZw2ZTfhweNb-OL/view?usp=drive_link",
    tracks: [
      "New Age", "The Enemy", "2 + 2", "Get Out Of My Life", "Woke Up Screaming",
      "Last Night", "Thirteen", "Great White Hope", "The Prisoner", "Rich Bitch",
      "Take A Chance", "Watcha Gonna Do", "World War III", "New Wave Sucks"
    ]
  },
  {
    id: "hardcore-81",
    title: "Hardcore '81",
    artist: "DOA",
    year: 1981,
    genre: "Hardcore Punk",
    city: "Vancouver, BC",
    label: "Friends Records",
    img: "img/Mc011.jpg",
    download: "https://drive.google.com/file/d/19A-n3O_ZeURKQbdKQIRXapDkNOQrSusM/view?usp=drive_link",
    tracks: [
      "D.O.A.", "Unknown", "Slumlord", "Musical Interlude", "I Don't Give A Shit",
      "M.C.T.F.D.", "Communication Breakdown", "001 Losers' Club", "Fucked Up Baby",
      "The Kenny Blister Song", "Smash The State", "My Old Man's A Bum",
      "Bloodsucker Baby", "Waiting For You"
    ]
  },
  {
    id: "war-on-45",
    title: "War on 45",
    artist: "DOA",
    year: 1982,
    genre: "Hardcore Punk",
    city: "Vancouver, BC",
    label: "Alternative Tentacles",
    img: "img/Mc012.jpg",
    download: "https://drive.google.com/file/d/1_PG34D9cL4nn2JdQLXL3s-PP9wzAC8-f/view?usp=drive_link",
    tracks: [
      "Liar For Hire", "I'm Right, You're Wrong", "America The Beautiful", "Let's Fuck",
      "War", "I Hate You", "War In The East", "Class War"
    ]
  },
  {
    id: "unreleased-ep",
    title: "Unreleased EP",
    artist: "Jerry's Kids",
    year: 1982,
    genre: "Hardcore Punk",
    city: "Boston, MA",
    label: "X-Claim! Records",
    img: "img/Mc013.jpg",
    download: "https://drive.google.com/file/d/1baZdAhmlFUE7nhPvYfEHNuB51ixlT6uU/view?usp=drive_link",
    tracks: [
      "Why Me", "I'm Pissed", "Wired", "Desperate", "Pressure", "I Don't Wanna",
      "I Hate You", "Lysol", "Machine Gun", "It's OK"
    ]
  },
  {
    id: "is-this-my-world",
    title: "Is This My World?",
    artist: "Jerry's Kids",
    year: 1983,
    genre: "Hardcore Punk",
    city: "Boston, MA",
    label: "X-Claim! Records",
    img: "img/Mc014.jpg",
    download: "https://drive.google.com/file/d/1mKw2pkE1Pi9lrW8YWc1WYLt-KpGf41j5/view?usp=drive_link",
    tracks: [
      "I Don't Belong", "Cracks In The Wall", "Tear It Up", "Crucify Me", "Break The Mold",
      "Raise The Curtain", "Vietnam Syndrome", "Build Me A Bomb", "New World", "Lost",
      "No Time", "Is This My World?"
    ]
  },
  {
    id: "no-policy",
    title: "No Policy",
    artist: "SOA",
    year: 1981,
    genre: "Hardcore Punk",
    city: "Washington, D.C.",
    label: "Dischord Records",
    img: "img/Mc015.jpg",
    download: "https://drive.google.com/file/d/1JfBFteWacKBYFu20DjL6qknDq38HvqFs/view?usp=drive_link",
    tracks: [
      "Lost In Space", "Draw Blank", "Girl Problems", "Blackout", "Gate Crashers",
      "Warzone", "Riot", "Gang Fight", "Public Defender", "Gonna Have To Fight"
    ]
  },
  {
    id: "flex-your-head",
    title: "Flex Your Head",
    artist: "SOA",
    year: 1982,
    genre: "Hardcore Punk",
    city: "Washington, D.C.",
    label: "Dischord Records",
    img: "img/Mc016.jpg",
    download: "https://drive.google.com/file/d/16oRkvBOaCQCRwtJmmdDj9NvUgrikpxpR/view?usp=drive_link",
    tracks: [
      "Disease", "I Hate The Kids", "Stepping Stone Party"
    ]
  },
  {
    id: "gi",
    title: "(GI)",
    artist: "The Germs",
    year: 1979,
    genre: "Punk Rock",
    city: "Los Angeles, CA",
    label: "Slash Records",
    img: "img/Mc019.jpg",
    download: "https://drive.google.com/file/d/16nJKdZ6j7yv6FG14KLNlzYm53pjHMbYX/view?usp=drive_link",
    tracks: [
      "What We Do Is Secret", "Communist Eyes", "Land of Treason", "Richie Dagger's Crime",
      "Strange Notes", "American Leather", "Lexicon Devil", "Manimal", "Our Way",
      "We Must Bleed", "Media Blitz", "The Other Newest One", "Let's Pretend",
      "Dragon Lady", "The Slave", "Shut Down (Annihilation Man)", "Caught in My Eye"
    ]
  },
  {
    id: "cats-clause-live",
    title: "Cat's Clause (Live)",
    artist: "The Germs",
    year: 1993,
    genre: "Punk Rock",
    city: "Los Angeles, CA",
    label: "Slash Records",
    img: "img/Mc020.jpg",
    download: "https://drive.google.com/file/d/1tDf-t2v_9bg_Iczf5K5EQ1G4DPq3Ur9F/view?usp=drive_link",
    tracks: [
      "Public Image - Live", "Lion's Share - Live", "Strange Notes (Live 1980)",
      "Shut Down - Live", "Germs Riot - Live", "Lexicon Devil - Live",
      "Other Newest One - Live", "My Tunnel - Live", "Circle One - Live",
      "Strange Notes (Live 1979)", "Communist Eyes - Live", "Forming - Live",
      "What We Do Is Secret - Live"
    ]
  },
  {
    id: "negative-approach",
    title: "Negative Approach",
    artist: "Negative Approach",
    year: 1982,
    genre: "Hardcore Punk",
    city: "Detroit, MI",
    label: "Touch and Go Records",
    img: "img/Mc021.jpg",
    download: "https://drive.google.com/file/d/12-4u2vQ6Lnnb5-CSHVXilsBFm4WAWXuY/view?usp=drive_link",
    tracks: [
      "Can't Tell No One", "Sick of Talk", "Pressure", "Why Be Something That You're Not",
      "Nothing", "Fair Warning", "Ready To Fight", "Lead Song", "What Ever I Do",
      "Negative Approach"
    ]
  },
  {
    id: "tied-down",
    title: "Tied Down",
    artist: "Negative Approach",
    year: 1983,
    genre: "Hardcore Punk",
    city: "Detroit, MI",
    label: "Touch and Go Records",
    img: "img/Mc022.jpg",
    download: "https://drive.google.com/file/d/1xLQ-YGa29wtR3Bkx9Bxa-iqzBPoufTG-/view?usp=drive_link",
    tracks: [
      "Tied Down", "Hypocrite", "Evacuate", "Said and Done", "Nothing (LP version)",
      "Your Mistake", "Live Your Life", "Friend or Foe", "Dead Stop", "I'll Survive"
    ]
  },
  {
    id: "the-speed-of-twisted-thought",
    title: "The Speed of Twisted Thought",
    artist: "The Fix",
    year: 2006,
    genre: "Hardcore Punk",
    city: "Lansing, MI",
    label: "Touch and Go Records",
    img: "img/Mc023.jpg",
    download: "https://drive.google.com/file/d/1cU2oPtChPZkcd_7azmd3SUNM1hUma-kx/view?usp=drive_link",
    tracks: [
      "Vengeance", "In This Town", "Cos the Elite", "Truth Right Now", "Signals",
      "Off to War", "No Idols", "Candy Store", "Famous", "Vengeance - Outtakes from Jan's Room Sessions",
      "Celebre - Outtakes from Jan's Room Sessions", "Rat Patrol - Outtakes from Jan's Room Sessions",
      "Cos The Elite - Live", "The Letter - Live", "Famous - Live", "Off To War - Live",
      "In This Town - Live", "Rat Patrol - Live", "Statement - Live", "Candy Store - Live",
      "You - Live", "Teenage Drugs - Live", "Waiting For Eviction - Live", "Media Blitz - Live"
    ]
  },
  {
    id: "cause-for-alarm",
    title: "Cause for Alarm",
    artist: "Cause for Alarm",
    year: 1982,
    genre: "Hardcore Punk",
    city: "New York, NY",
    label: "Rat Cage Records",
    img: "img/Mc024.jpg",
    download: "https://drive.google.com/file/d/1tDf-t2v_9bg_Iczf5K5EQ1G4DPq3Ur9F/view?usp=drive_link",
    tracks: [
      "Parasite", "Second Chance", "Time To Try", "United Races", "In Search Of",
      "Poison In The Machine", "True Colors", "Stand As One", "Time Will Tell"
    ]
  },
  {
    id: "the-kids-will-have-their-say",
    title: "The Kids Will Have Their Say",
    artist: "SS Decontrol",
    year: 1982,
    genre: "Hardcore Punk",
    city: "Boston, MA",
    label: "X-Claim! Records",
    img: "img/Mc025.jpg",
    download: "https://drive.google.com/file/d/1EnKGXpTnf6G4X95XKb6CPXRwJ5w_CI0v/view?usp=drive_link",
    tracks: [
      "Bolling Point", "Fight Them", "You Don't Even Care", "Not Normal", "Wasted Youth",
      "Jock Itch", "Fun To You", "V.A.", "How Much Art", "The Kids Will Have Their Say",
      "Headed Straight", "War Threat", "Teach Me Violence", "Screw", "Who's To Judge",
      "Police Beat", "United", "The End"
    ]
  },
  {
    id: "get-it-away",
    title: "Get It Away",
    artist: "SS Decontrol",
    year: 1983,
    genre: "Hardcore Punk",
    city: "Boston, MA",
    label: "X-Claim! Records",
    img: "img/Mc026.jpg",
    download: "https://drive.google.com/file/d/1_EnhVA9BveJUj_AP8KfmK6u1zkRjOPkC/view?usp=drive_link",
    tracks: [
      "Glue", "Forced Down Your Throat", "Get It Away", "Under The Influence",
      "Nothing Done", "Xclaim", "No Reply"
    ]
  },
  {
    id: "incorrect-thoughts",
    title: "Incorrect Thoughts",
    artist: "Subhumans",
    year: 1980,
    genre: "Hardcore Punk",
    city: "Victoria, BC",
    label: "Friends Records",
    img: "img/Mc027.jpg",
    download: "https://drive.google.com/file/d/15vh2cgsRDOf8fEotHvigRYssb0q6mddH/view?usp=drive_link",
    tracks: [
      "The Scheme", "New Order", "Behind My Smile", "Out of Line", "Big Picture",
      "Dead at Birth", "Urban Guerillas", "War in the Head", "Firing Squad",
      "Slave to My Dick", "Death to the Sickoids", "Greaser Boy", "Model of Stupidity",
      "We're Alive", "Refugee", "Let's Go Down to Hollywood (& Shoot People)"
    ]
  },
  {
    id: "group-sex",
    title: "Group Sex",
    artist: "Circle Jerks",
    year: 1980,
    genre: "Hardcore Punk",
    city: "Los Angeles, CA",
    label: "Frontier Records",
    img: "img/Mc028.jpg",
    download: "https://drive.google.com/file/d/1fTaRkv_nwskLPuVfKooHnjwQchTWPGrl/view?usp=drive_link",
    tracks: [
      "Deny Everything", "I Just Want Some Skank", "Beverly Hills", "Operation",
      "Back Against the Wall", "Wasted", "Behind the Door", "World up My Ass",
      "Paid Vacation", "Don't Care", "Live Fast Die Young", "What's Your Problem",
      "Group Sex", "Red Tape"
    ]
  },
  {
    id: "youth-anthems-for-the-new-order",
    title: "Youth Anthems for the New Order",
    artist: "Reagan Youth",
    year: 1984,
    genre: "Hardcore Punk",
    city: "New York, NY",
    label: "New Red Archives",
    img: "img/Mc029.jpg",
    download: "https://drive.google.com/file/d/12Fs6px3NgZfLKVMV0fxdd7RCpBWdNUJy/view?usp=drive_link",
    tracks: [
      "New Aryans", "Reagan Youth", "(Are You Really) Happy", "I Hate Hate",
      "Degenerated", "U.S.A.", "(You're a) Gonowhere"
    ]
  },
  {
    id: "let-them-eat-jellybeans",
    title: "Let Them Eat Jellybeans",
    artist: "Various Artists",
    year: 1982,
    genre: "Hardcore Punk",
    city: "Various",
    label: "Alternative Tentacles",
    img: "img/Mc031.jpg",
    download: "https://drive.google.com/file/d/152wY9R42R3oSWXu0sXQ6TcyND0SZBn1s/view?usp=drive_link",
    tracks: [
      "Ha Ha Ha (Flipper)", "The Prisoner (D.O.A.)", "Police Story (Black Flag)",
      "Pay to Cum (Bad Brains)", "Nazi Punks Fuck Off (Dead Kennedys)",
      "Paid Vacation (Circle Jerks)", "Prostitution (Really Red)",
      "Jesus Entering From The Rear (Feederz)", "Slave To My Dick (Subhumans)",
      "Isotope Soap (Geza X)", "Persecution - That's My Song (BPeople)",
      "An Object (Wounds)", "Everyone's A Bigot (Offs)", "Corporate Food (Anonymous)",
      "Fun Again (Half Japanese)", "Joke's On You (Christian Lunch)", "Sleep (Voice Farm)"
    ]
  },
  {
    id: "beware-all-eps-collection",
    title: "Beware: All EPs Collection",
    artist: "Misfits",
    year: "Non-Official",
    genre: "Horror Punk",
    city: "Lodi, NJ",
    label: "Non-Official",
    img: "img/Mc009.jpg",
    download: "https://drive.google.com/file/d/1iVM4iTXzx8_FIq4t2UzO5LuqGcpGcJwU/view?usp=drive_link",
    tracks: [
      "She", "Cough/Cool", "We Are 138", "Hollywood Babylon", "Bullet", "Attitude",
      "Children In Heat", "Horror Business", "Teenagers From Mars", "Night Of The Living Dead",
      "Rat Fink", "Where Eagles Dare", "Spook City USA", "Who Killed Marilyn?",
      "Ghouls Night Out", "Horror Hotel", "London Dungeon", "Die Die My Darling",
      "Mommy, Can I Go Out And Kill Tonight?", "We Bite"
    ]
  },
  {
    id: "legacy-of-brutality",
    title: "Legacy Of Brutality",
    artist: "Misfits",
    year: 1985,
    genre: "Horror Punk",
    city: "Lodi, NJ",
    label: "Plan 9 Records",
    img: "img/Mc007.jpg",
    download: "https://drive.google.com/file/d/1TjDw7qIqEQKVswCzlOfJ9pXa3e_sOT6W/view?usp=drive_link",
    tracks: [
      "Static Age", "TV Casualty", "Hybrid Moments", "Spinal Remains", "Come Back",
      "Some Kinda Hate", "Theme For A Jackal", "Angelfuck", "Who Killed Marilyn?",
      "Where Eagles Dare", "She", "Halloween", "American Nightmare"
    ]
  },
  {
    id: "damaged-jealous-again",
    title: "Damaged / Jealous Again",
    artist: "Black Flag",
    year: 1995,
    genre: "Hardcore Punk",
    city: "Hermosa Beach, CA",
    label: "SST Records",
    img: "img/Mc017.jpg",
    download: "https://drive.google.com/file/d/1pykvhvQNWDsR2X3FhPx7B9-GhH5kIfX4/view?usp=drive_link",
    tracks: [
      "Rise Above", "Spray Paint", "Six Pack", "What I See", "TV Party",
      "Thirsty and Miserable", "Police Story", "Gimmie Gimmie Gimmie", "Depression",
      "Room 13", "Damaged II", "No More", "Padded Cell", "Life of Pain", "Damaged I",
      "Jealous Again", "Revenge", "White Minority", "No Values",
      "You Bet We've Got Something Against You!"
    ]
  },
  {
    id: "lexicon-devil",
    title: "Lexicon Devil",
    artist: "The Germs",
    year: 1978,
    genre: "Punk Rock",
    city: "Los Angeles, CA",
    label: "What? Records",
    img: "img/Mc018.jpg",
    download: "https://drive.google.com/file/d/1TCYSBSn1Z25HkAIIXihJBxMnbnE3LlFg/view?usp=drive_link",
    tracks: [
      "Lexicon Devil", "Circle One", "No God"
    ]
  },
  {
    id: "straight-edge-revenge",
    title: "Straight Edge Revenge",
    artist: "Project X",
    year: 1987,
    genre: "Hardcore Punk",
    city: "New York, NY",
    label: "Schism Records",
    img: "img/Mc030.jpg",
    download: "https://drive.google.com/file/d/13IAfSlRLV60zVV4S3KvK1BoGTc0LsYuO/view?usp=drive_link",
    tracks: [
      "Straight Edge Revenge", "Shutdown", "Cross Me", "Dance Floor Justice",
      "Where It Ends", "Live @ The Anthrax, March 18th, 1988"
    ]
  }
];

// ====================== ALBUM DETAIL PAGE ======================
const albumDetail = document.getElementById("album-detail");
if (albumDetail) {
  // Универсальное извлечение ID — работает и с /album/xxx и со старым ?id=
  let id = null;
  const pathname = window.location.pathname;

  if (pathname.startsWith('/album/') || pathname.startsWith('/albums/')) {
    id = pathname.split('/').filter(Boolean).pop();   // берём последний сегмент
  }

  if (!id && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    id = params.get('id');
  }

  console.log('Extracted album ID:', id); // для отладки

  const album = albums.find(a => a.id === id);

  if (!album) {
    albumDetail.innerHTML = `<p class="error">Album not found.</p>`;
    console.error('Album with id "' + id + '" not found');
  } else {
    document.title = `${album.title} – snofolk.space`;

    let downloadUrl = '';
    if (album.download) {
      const fileId = album.download.match(/[-\w]{25,}/)?.[0];
      if (fileId) {
        downloadUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
      } else {
        downloadUrl = album.download + (album.download.includes('?') ? '&' : '?') + 'confirm=t';
      }
    }

    albumDetail.innerHTML = `
      <div class="album-detail-wrap">
        <div class="album-cover-col">
          <img src="${album.img}" alt="${album.title}" class="album-cover-big">
          ${downloadUrl
            ? `
            <a href="${downloadUrl}" class="download-btn download-btn-cover" download>
              Download Album (.rar)
            </a>
            <p class="download-hint">
              If Google shows a warning — click "Download anyway"
            </p>`
            : `<p class="no-download">Download link will be added later</p>`
          }
        </div>
        <div class="album-info-col">
          <h2 class="album-title">${album.title}</h2>
          <p class="album-artist">${album.artist}</p>
          <ul class="album-meta">
            <li><span>Year</span>${album.year}</li>
            <li><span>Genre</span>${album.genre}</li>
            <li><span>City</span>${album.city}</li>
            <li><span>Label</span>${album.label}</li>
          </ul>
          <div class="tracklist">
            <h3>Tracklist</h3>
            <ol>
              ${album.tracks.map(t => `<li>${t}</li>`).join("")}
            </ol>
          </div>
        </div>
      </div>
    `;
  }
}

// ====================== OTHER PAGES ======================
// Highlight active nav link
document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === location.pathname.split("/").pop() || 
      location.pathname.includes(link.getAttribute("href"))) {
    link.classList.add("active");
  }
});

// Downloads page — album cards
const container = document.getElementById("albums");
if (container) {
  albums.forEach(album => {
    const div = document.createElement("div");
    div.className = "album";
    div.innerHTML = `
      <a href="/album/${album.id}" class="album-link">
        <img src="${album.img}" alt="${album.title}">
        <h3>${album.title}</h3>
        <p>${album.artist} • ${album.year}</p>
      </a>
    `;
    container.appendChild(div);
  });
}

// About page — album list
const albumList = document.getElementById("album-list");
if (albumList) {
  albums.forEach(album => {
    const li = document.createElement("li");
    li.textContent = `${album.artist} — ${album.title} (${album.year})`;
    albumList.appendChild(li);
  });
}

// Homepage — last 5 albums
const newAlbumsContainer = document.getElementById("new-albums");
if (newAlbumsContainer) {
  const last5 = albums.slice(-5);
  last5.forEach(album => {
    const div = document.createElement("div");
    div.className = "album-mini";
    div.innerHTML = `
      <a href="/album/${album.id}">
        <img src="${album.img}" alt="${album.title}">
      </a>
      <p>${album.title} • ${album.artist}</p>
    `;
    newAlbumsContainer.appendChild(div);
  });
}
