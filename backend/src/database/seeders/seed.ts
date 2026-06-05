import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { User } from '../../users/entities/user.entity';
import { Manhwa } from '../../manhwas/entities/manhwa.entity';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';
import { UserRole } from '../../common/enums/user-role.enum';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'manhwa_tracker',
  entities: [User, Manhwa, Bookmark],
  synchronize: true,
});

const HASHED_PASSWORD = bcrypt.hashSync('password123', 10);

const SEED_USERS = [
  {
    id: 'f874a3e5-41df-45ea-b0ea-a4302eeb3a50',
    name: 'Admin User',
    email: 'admin@manhwa.com',
    password: '$2a$10$eF0DSQpKGdS0Qj5VcfRdQuGeF4hUGYmwBo0/tVE6nCheUG0g.l69O',
    role: UserRole.ADMIN,
  },
  {
    id: '83eb311d-220f-476d-b54b-85cd6e157a04',
    name: 'Editor User',
    email: 'editor@manhwa.com',
    password: '$2a$10$eF0DSQpKGdS0Qj5VcfRdQuGeF4hUGYmwBo0/tVE6nCheUG0g.l69O',
    role: UserRole.EDITOR,
  },
  {
    id: '85ccf4c0-13a7-4433-84d8-5f55fe5e1bc5',
    name: 'Eve Reader',
    email: 'eve@manhwa.com',
    password: '$2a$10$eF0DSQpKGdS0Qj5VcfRdQuGeF4hUGYmwBo0/tVE6nCheUG0g.l69O',
    role: UserRole.EDITOR,
  },
  {
    id: '32095c1e-f101-411b-8568-37fce56c8d28',
    name: 'Alice Reader',
    email: 'alice@manhwa.com',
    password: '$2a$10$eF0DSQpKGdS0Qj5VcfRdQuGeF4hUGYmwBo0/tVE6nCheUG0g.l69O',
    role: UserRole.USER,
  },
  {
    id: 'c26c2488-be9f-49ce-85ce-14aa15cc27bd',
    name: 'Bob Reader',
    email: 'bob@manhwa.com',
    password: '$2a$10$eF0DSQpKGdS0Qj5VcfRdQuGeF4hUGYmwBo0/tVE6nCheUG0g.l69O',
    role: UserRole.USER,
  },
];

const SEED_MANHWAS = [
  {
    id: '31a3f7cc-59ed-491e-b423-9fd172913886',
    title: 'Solo Leveling',
    author: 'Chugong',
    synopsis: 'Manhwa Solo Leveling yang dibuat oleh komikus bernama Chugong ini bercerita tentang 10 tahun yang lalu setelah Gerbang yang menghubungkan dunia nyata dengan dunia monster terbuka beberapa orang biasa setiap hari menerima kekuatan untuk berburu monster di dalam Gerbang Mereka dikenal sebagai Pemburu Namun tidak semua Pemburu kuat Nama saya Sung JinWoo seorang Pemburu peringkatE Saya seseorang yang harus mem',
    coverImage: 'https://assets.shngm.id/thumbnail/cover/048dbc142b97.png',
  },
  {
    id: '709ecfe2-66c2-439b-a6e1-e14f65fd3c70',
    title: "The Regressed Mercenary's Machinations",
    author: 'Gold Line',
    synopsis: 'Ghislain Perdium sang Mercenary King dan salah satu orang terkuat di benua memulai perang untuk membalaskan dendam keluarganya Rencana balas dendamnya berjalan dengan lancar sampai dia dihabisi oleh Idun yang tidak disangkasangka malah muncul Ghislain mengira bahwa dia sudah mati namun kembali bangun sebagai dirinya yang masih muda sebelum keluarganya runtuh Dengan kesempatan kedua ini dia memutuskan untuk memperbaiki semua kepingan puzzle yang salah dan menghindari kesalahankesalahan di kehidupan sebelumnya',
    coverImage: 'https://assets.shngm.id/thumbnail/cover/banner_1780414226428_ng198m.jpg',
  },
  {
    id: '321c4b2f-3ce9-4125-b8e2-afee1f3e40df',
    title: "Reincarnator's Stream",
    author: 'Next Level Studio',
    synopsis: 'Narukami Subaru, pemain terkuat sekaligus Penguasa Petir, dikhianati dan dibunuh oleh sahabat yang ia percayai saat menaklukkan Menara. Setelah mengerahkan seluruh kekuatannya untuk menyelamatkan rekan-rekannya, ia tewas. Namun entah bagaimana, dengan sepenuhnya sadar bahwa dirinya sudah mati. Dia membuka mata dan mendapati dirinya bereinkarnasi 20 tahun di masa depan.',
    coverImage: 'https://assets.shngm.id/thumbnail/image/0eaf7699-a89d-47e7-86b2-f1309528b73d.jpg',
  },
  {
    id: '2e889df8-ebe5-457b-b855-72520ff443e8',
    title: 'The 100th Regression Of The Max-Level Player',
    author: 'Yeoun',
    synopsis: 'Setiap manusia yang berusia antara 15 tahun sampai 25 tahun di seluruh dunia diwajibkan untuk berpartisipasi dalam death game yang terdiri dari 20 ronde. Ryu Min berdiri sendirian di depan pintu masuk ronde terakhir. Pada percobaan yang ke-100 dan terakhirnya dia menggunakan informasi dari 99 percobaan sebelumnya.',
    coverImage: 'https://assets.shngm.id/thumbnail/cover/banner_1778684661798_pmc5dv.jpg',
  },
  {
    id: 'bec9b81e-7479-490b-aabf-3619637e2a7b',
    title: 'Sandmancer Of The Scorched Desert',
    author: '-',
    synopsis: '"Namaku Zeon. Senjataku adalah seluruh gurun." Bumi telah diubah bentuknya secara paksa. Lautan menguap, dan daratan berubah menjadi pasir. Zeon adalah satu-satunya penyihir pasir yang tersisa di Bumi yang telah menjadi gurun ini.',
    coverImage: 'https://assets.shngm.id/thumbnail/cover/banner_1777845041160_dy41zf.jpg',
  },
  {
    id: 'd8ce7f1d-f4e6-4a50-bc92-02008d26c5ab',
    title: "Magic Academy's Genius Blinker",
    author: 'Eunmilhi',
    synopsis: 'Karakter dengan tingkat kesulitan tertinggi dan performa terburuk Baek Yuseol dianggap sebagai karakter ingame sampah karena dia tidak bisa menggunakan sihir. Bertahan hidup di antara para mage jenius di Akademi Stella, aku menjadi Blink Mage yang terkenal.',
    coverImage: 'https://assets.shngm.id/thumbnail/image/a1a95eed-5ea1-4625-82f5-aebc1be240ce.jpg',
  },
  {
    id: 'e5adcd74-6f43-47ef-9fc8-0182384e5821',
    title: 'Eleceed',
    author: 'Son Jeho',
    synopsis: 'Kaiden pengguna kemampuan misterius yang bersembunyi di dalam tubuh kucing jalanan dijemput oleh Jiwoo setelah terluka setelah berkelahi dengan pengguna kemampuan lain. Jiwoo adalah anak SMA yang energik dan banyak bicara yang suka kucing.',
    coverImage: 'https://assets.shngm.id/thumbnail/image/08d8cb84-973a-4995-8b3e-bdfd9e305174.jpg',
  },
  {
    id: 'fc356ecf-4cb4-42da-98b2-b8b504960288',
    title: "The Extra's Academy Survival Guide",
    author: 'Corita',
    synopsis: 'Aku merasuki karakter villain ekstra kelas tiga dalam game kesukaanku. Aku tidak memiliki ambisi dan aku hanya mau menjalani hidup yang tenang. Aku akan bertahan hidup sampai akhir cerita ini dengan cara seorang karakter villain kelas tiga.',
    coverImage: 'https://assets.shngm.id/thumbnail/cover/banner_1769091919073_j8x1vv.jpg',
  },
  {
    id: 'c38eb3e0-a6ad-47f0-9e54-36b55e9768bc',
    title: 'Became The Patron Of Villains',
    author: '-',
    synopsis: 'Aku, seorang budak yang bereinkarnasi menjadi seorang bangsawan di dalam game. Untuk mencegah para calon penjahat kecil itu berubah menjadi jahat, aku menjadi dermawan dan membantu mereka. Hasilnya? Mereka semua tumbuh menjadi anak-anak yang luar biasa. Namun pada akhirnya aku malah menjadi dalang terakhir dari kerajaan.',
    coverImage: 'https://assets.shngm.id/thumbnail/image/06b7fcc3-026d-47e5-b12d-78e68f8547fd.jpg',
  },
  {
    id: 'fe09bc4c-7618-428d-8a7b-a2f0c35a0bca',
    title: 'Solo Max-Level Newbie',
    author: 'Maslow',
    synopsis: 'Jinhyuk, satu-satunya pemain game [MENARA UJIAN] yang menyelesaikan sampai akhir meski popularitas game telah menurun. Hingga suatu hari [MENARA UJIAN] menjadi kenyataan, Jinhyuk harus menyelesaikannya dengan segala elemen yang ia ketahui tentang game ini!',
    coverImage: 'https://assets.shngm.id/thumbnail/cover/banner_1780413923682_yyo9my.jpg',
  },
  {
    id: '4bf12114-335b-4a45-b08e-70c53cf180ee',
    title: 'Star-Embracing Swordmaster',
    author: 'Hong Dae-Wui',
    synopsis: 'Vlad adalah anak gelandangan dari daerah kumuh yang selalu mengagumi kesatria. Setelah sebuah insiden di mana dia tersambar petir hitam dia mulai mendengar suara. Bahkan sebuah bintang yang redup yang tidak bersinar di puncak langit malam masih sebuah bintang jika ia ingin bersinar.',
    coverImage: 'https://assets.shngm.id/thumbnail/image/8e38baef-c9c5-4662-adab-778237de2eb3.jpg',
  },
  {
    id: 'df160c1b-7e10-4699-8234-95c51fbf35c3',
    title: 'The World After The Fall',
    author: 'S-Cynaan',
    synopsis: 'Manusia tiba-tiba dipanggil untuk menjadi Walkers dan mereka perlu menyelesaikan menara untuk menyelamatkan dunia. Kemudian Regression Stone ditemukan, sekarang Walkers bisa kembali ke masa lalu. Ini adalah kisah tentang satu-satunya pria yang pantang mundur untuk meninggalkan dunianya.',
    coverImage: 'https://assets.shngm.id/thumbnail/cover/banner_1780414298811_rqgtsj.jpg',
  },
  {
    id: 'efc6a47f-f6cc-4912-a98b-1fc90cdb8315',
    title: 'I Took over The Academy With a Single Sashimi Knife',
    author: 'Tong Ahulu',
    synopsis: 'Aku yang dulu pernah disebut sebagai pemotong sashimi terhebat di Korea Selatan telah terperosok ke dalam mobile game yang membuatku menghabiskan banyak uang. Bahkan sudah topup pun game ampas ini masih membuatku kesulitan menyelesaikannya.',
    coverImage: 'https://assets.shngm.id/thumbnail/image/f5bfb529-1783-46a4-ad65-312ecedc7dbf.jpg',
  },
  {
    id: '4409e756-9a09-4401-a2a0-e25d65f239cf',
    title: 'Pick Me Up',
    author: 'Hermod',
    synopsis: 'Dalam game gacha yang terkenal dengan kesulitannya yang mengerikan, Master peringkat ke-5 di dunia Loki kehilangan kesadaran saat menyerbu Dungeon. Setelah bangun Loki menyadari bahwa dia telah berubah menjadi Pahlawan Level 1 Bintang 1.',
    coverImage: 'https://assets.shngm.id/thumbnail/cover/banner_1778080928768_j48q5q.jpg',
  },
  {
    id: '46580a14-0f18-482b-8d13-e4e19770cc0e',
    title: 'Nano Machine',
    author: 'Han-Joong',
    synopsis: 'Setelah direndahkan dan menghabiskan hidupnya dalam bahaya seorang yatim piatu dari pemuja iblis YeoWoon mendapatkan kunjungan tak terduga dari keturunannya dari masa depan yang memasukkan sebuah mesin nano ke dalam tubuhnya.',
    coverImage: 'https://assets.shngm.id/thumbnail/image/27994c6a-415a-41cf-8569-de7e9b6ae7d9.jpg',
  },
  {
    id: '0c3ce3d4-a121-42ba-bb9c-0ff82bb7b4a4',
    title: 'I Killed An Academy Player',
    author: 'Salamasllyeo',
    synopsis: 'Dari author series The Knight King Who Returned with a God. Aku sudah membunuh sang player. Dia adalah bajingan yang sangat menyebalkan.',
    coverImage: 'https://assets.shngm.id/thumbnail/image/3f434882-1e65-4f8b-ae56-381e6b731cfc.jpg',
  },
  {
    id: 'a69d4410-532e-4a6a-a040-be0025f71c7b',
    title: 'Got Dropped Into A Ghost Story, Still Gotta Work',
    author: '-',
    synopsis: 'Sebuah acara dadakan untuk serial fantasi modern yang sangat kusukai sampai aku rela menggunakan cuti tahunanku. Dan hari itu, aku berpindah ke dunia fantasi modern tersebut sebagai karyawan baru yang baru saja mendapatkan pekerjaan di sebuah perusahaan besar ternama.',
    coverImage: 'https://assets.shngm.id/thumbnail/cover/banner_1779704328816_w228jp.png',
  },
  {
    id: '972c28c7-d6c3-4bf6-98fe-f293116bd55c',
    title: 'He Shepherd Wizard',
    author: 'PTJ Comics',
    synopsis: 'Turan, seorang penggembala biasa dari Bukit Hisaril. Ia yang selama ini hidup dengan menyembunyikan bakatnya sebagai penyihir agung, akhirnya melangkah keluar ke dunia.',
    coverImage: 'https://assets.shngm.id/thumbnail/cover/banner_1779114279519_ugl8cf.jpg',
  },
];

const SEED_BOOKMARKS = [
  {
    id: '1d759a1c-579f-4f71-a819-1bbe0e4e8c01',
    userId: 'f874a3e5-41df-45ea-b0ea-a4302eeb3a50',
    manhwaId: 'a69d4410-532e-4a6a-a040-be0025f71c7b',
  },
  {
    id: 'e6391978-541d-4755-a374-1c7b7f1d949c',
    userId: 'f874a3e5-41df-45ea-b0ea-a4302eeb3a50',
    manhwaId: '4409e756-9a09-4401-a2a0-e25d65f239cf',
  },
  {
    id: 'f721461f-88e8-4bfa-8d9b-7bf128a781f7',
    userId: 'f874a3e5-41df-45ea-b0ea-a4302eeb3a50',
    manhwaId: 'c38eb3e0-a6ad-47f0-9e54-36b55e9768bc',
  },
  {
    id: '86ff2452-7940-4f9c-8ac7-1fad57734a88',
    userId: 'f874a3e5-41df-45ea-b0ea-a4302eeb3a50',
    manhwaId: 'df160c1b-7e10-4699-8234-95c51fbf35c3',
  },
  {
    id: '942c6a44-32d5-4844-98b5-4b7e150f0a7d',
    userId: 'f874a3e5-41df-45ea-b0ea-a4302eeb3a50',
    manhwaId: '4bf12114-335b-4a45-b08e-70c53cf180ee',
  },
  {
    id: '145d02a2-4f13-4b94-b80b-203372741156',
    userId: 'f874a3e5-41df-45ea-b0ea-a4302eeb3a50',
    manhwaId: '2e889df8-ebe5-457b-b855-72520ff443e8',
  },
  {
    id: 'be8a2088-bb94-4208-a2b1-a4f9fde00874',
    userId: 'f874a3e5-41df-45ea-b0ea-a4302eeb3a50',
    manhwaId: '709ecfe2-66c2-439b-a6e1-e14f65fd3c70',
  },
];

async function seed() {
  console.log('🌱 Starting database seeder...');

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const userRepository = AppDataSource.getRepository(User);
    const manhwaRepository = AppDataSource.getRepository(Manhwa);
    const bookmarkRepository = AppDataSource.getRepository(Bookmark);

    console.log('🧹 Clearing existing data...');
    await AppDataSource.query('TRUNCATE TABLE bookmarks CASCADE');
    await AppDataSource.query('TRUNCATE TABLE manhwas CASCADE');
    await AppDataSource.query('TRUNCATE TABLE users CASCADE');

    console.log('👤 Seeding users...');
    const createdUsers = await userRepository.save(
      userRepository.create(SEED_USERS),
    );
    console.log(`  ✅ Created ${createdUsers.length} users`);

    console.log('📚 Seeding manhwas...');
    const createdManhwas = await manhwaRepository.save(
      manhwaRepository.create(SEED_MANHWAS),
    );
    console.log(`  ✅ Created ${createdManhwas.length} manhwas`);

    console.log('🔖 Seeding bookmarks...');
    const bookmarkEntities = SEED_BOOKMARKS.map((b) =>
      bookmarkRepository.create({
        id: b.id,
        user: { id: b.userId },
        manhwa: { id: b.manhwaId },
      }),
    );
    const createdBookmarks = await bookmarkRepository.save(bookmarkEntities);
    console.log(`  ✅ Created ${createdBookmarks.length} bookmarks`);

    console.log('\n🎉 Seeding completed successfully!\n');
    console.log('📋 Seed Credentials:');
    console.log('  Admin   → admin@manhwa.com   / password123');
    console.log('  Editor  → editor@manhwa.com  / password123');
    console.log('  Editor  → eve@manhwa.com     / password123');
    console.log('  Users   → alice@manhwa.com   / password123');
    console.log('           → bob@manhwa.com     / password123');
    console.log('           → charlie@manhwa.com / password123');
    console.log('           → diana@manhwa.com   / password123');
    console.log('           → john@example.com   / password123');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();