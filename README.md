### cloudbot :cloud:
A deploy-it-yourself discord bot template of cloudcre for downloading music and lyrics.

![Example interaction](https://github.com/creuserr/cloudbot/assets/151720755/ee927caa-a582-45d5-a3cc-2cb9872291ad)


<p align="center">
  <img alt="Discord.js Version" src="https://img.shields.io/badge/Discord.JS-14.15.3-7289DA?style=for-the-badge&logo=discord&logoColor=white">
</p>

### Installation :package:
1. Clone this repository and install the dependencies
   ```sh
   git clone https://github.com/creuserr/cloudbot.git
   cd cloudbot
   npm install
   ```
2. Create a new `.env` file and place all the necessary tokens
   ```env
   TOKEN=your-discord-bot-token
   CLIENT_ID=your-discord-app-client-id
   ```
3. Run a test
   ```sh
   npm test
   ```
4. If everything is ready, start the client
   ```sh
   node src/index.js
   ```

### Commands

#### `/search query:<string>`

`/search` command is used to search for a song. The bot will send an audio attachment once downloaded. The audio is provided by Piped.

`query:` option is required. This is the keyword of what song you would like to search.

![Example of /search](https://github.com/creuserr/cloudbot/assets/151720755/91c45164-4cc0-4776-baf1-1d9e3bb24598)

#### `/lyrics query:<string>`

`/lyrics` command is used to search for a lyrics. The lyrics are provided by Genius.

`query:` option is required. This is the keyword of what song you would like to read its lyrics.

![Example of /lyrics](https://github.com/creuserr/cloudbot/assets/151720755/d15ad5c0-e584-4b4a-8a6b-f3804052e51d)
