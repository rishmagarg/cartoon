let { app } = require('../index.js');
let { getGameById, getGames } = require('../controllers');
let http = require('http');
const request = require('supertest');
const { beforeEach, describe } = require('node:test');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getGames: jest.fn(),
}));
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3008, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controller Function Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all games', () => {
    let mockedGame = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];

    getGames.mockReturnValue(mockedGame);
    let result = getGames();
    expect(result).toEqual(mockedGame);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints Tests', () => {
  it('GET /games should get all games', async () => {
    const response = await request(server).get('/games');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      games: [
        {
          gameId: 1,
          title: 'The Legend of Zelda: Breath of the Wild',
          genre: 'Adventure',
          platform: 'Nintendo Switch',
        },
        {
          gameId: 2,
          title: 'Red Dead Redemption 2',
          genre: 'Action',
          platform: 'PlayStation 4',
        },
        {
          gameId: 3,
          title: 'The Witcher 3: Wild Hunt',
          genre: 'RPG',
          platform: 'PC',
        },
      ],
    });
    expect(response.body.games.length).toBe(3);
  });

  it('GET /games/details/:id should get the game by id', async () => {
    const res = await request(server).get('/games/details/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      game: {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
    });
  });
});
