import { 
    CustomerName,
    Username,
    UUID,
    PlayerID,
} from "customTypes/StringTypes";

interface PlayerInfo {
    ID: UUID;             // Unique identifier for the player
    playerID: PlayerID;
    name: CustomerName;   // Full name (optional, could use firstName + lastName)
    firstName: CustomerName; // Player's first name
    lastName: CustomerName;  // Player's last name
    joinedOn: Date;       // Date when the player joined/registered
    timePlayed: number;   // Total time played in seconds
    gamesPlayed: number;  // Number of games the player has completed
    gamesWon: number;     // Number of games the player has won
    totalWordsFound: number; // Total number of words the player has found across all games
    bestTime: number;     // Player’s best time in seconds (for completing a game)
    currentGameID?: UUID; // Optional: Tracks the current game being played, if any
    lastLogin: Date;      // Date and time of the player's last login
    username: Username; 
    email?: string;       // Optional: Player's email address (if needed for login or marketing)
}
