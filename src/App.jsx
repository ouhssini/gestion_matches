import axios from "axios";
import React, { useEffect, useState } from "react";
import MatchesRes from "./components/MatchesRes";

const App = () => {
  const [teams, setTeams] = useState([]); // Team List
  const [Fteam, setFTeam] = useState(""); // First Team
  const [Steam, setSTeam] = useState(""); // Second Team
  const [players, setPlayers] = useState([]); // Players for Selected Team
  const [player,setPlayer] = useState("");
  const [minute,setMinute] = useState("");
  const [matches, setMatches] = useState([]); // Match List
  const [match, setMatch] = useState({}); // Selected Match
  const [date, setDate] = useState(""); // Selected Date

  // Fetch Teams from API
  useEffect(() => {
    axios.get("https://gahi-said.com/apis/matchs.php").then((response) => {
      setTeams(response.data);
    });
  }, []);


  // Add a Match
  const addMatch = () => {
    if (!date || !Fteam || !Steam) return;

    const match = {
      id: `${date}-${Fteam}-${Steam}`,
      first_team: Fteam,
      second_team: Steam,
      date: date,
      goals: [],
    };

    setMatches((prevMatches) => [...prevMatches, match]);
    setFTeam("");
    setSTeam("");
    setDate("");
  };


  const addGoal = () => {
    if (!player || !minute || !match.id) return; // Ensure player and minute are valid
    
    setMatches((prevMatches) =>
      prevMatches.map((m) => {
        if (m.id === match.id) {
          // Check if the player already has a goal record
          const playerGoal = m.goals.find((g) => g.player === player);
          
          if (playerGoal) {
            // If the player already has a record, add the minute to their 'minutes' array
            playerGoal.minutes.push(minute);
          } else {
            // If the player doesn't have a record, create a new entry with the minute
            m.goals.push({ player, minutes: [minute] });
          }
          return { ...m }; // Return the updated match object
        }
        return m; // If the match is not selected, return it unchanged
      })
    );
  
    // Clear the input fields after adding the goal
    setPlayer("");
    setMinute("");
  };
  
  
console.log(matches)  
  // Populate Players Based on Team
  const fillPlayers = (e) => {
    const team = e.target.value;
    if (!team) {
      setPlayers([]);
      return;
    }

    const pls = Array.from(
      { length: 11 },
      (_, i) => `${team.substring(0, 3)}_pl_${i + 1}`
    );
    setPlayers(pls);
  };

  // Form Validation
  const isFormValid = date && Fteam && Steam;

  return (
    <div className="container flex flex-col justify-center items-center my-5">
      <div className="flex gap-4 justify-center items-start w-4/5 mx-auto">
        {/* Team 1 Selection */}
        <div className="border-2 px-10 py-5 rounded-md flex flex-col">
          <div className="flex gap-4 my-4">
            <h1 className="text-xl font-bold bg-slate-500 px-4 flex items-center">
              Team 1:
            </h1>
            <select
              className="border py-2 px-10"
              value={Fteam}
              onChange={(e) => {
                setFTeam(e.target.value);
                setSTeam(""); // Reset Second Team
              }}
            >
              <option value="">Select a Team</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Team 2 Selection */}
          <div className="flex gap-4 my-4">
            <h1 className="text-xl font-bold bg-slate-500 px-4 flex items-center">
              Team 2:
            </h1>
            <select
              className="border py-2 px-10"
              value={Steam}
              onChange={(e) => setSTeam(e.target.value)}
            >
              <option value="">Select a Team</option>
              {teams
                .filter((team) => team !== Fteam) // Exclude Team 1
                .map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
            </select>
          </div>

          {/* Match Date */}
          <div className="flex gap-4 my-4">
            <h1 className="text-xl font-bold bg-slate-500 px-4 flex items-center">
              Date:
            </h1>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-10 border py-[5px]"
            />
          </div>

          {/* Add Match Button */}
          <button
            onClick={addMatch}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-500"
            disabled={!isFormValid}
          >
            Add Match
          </button>
        </div>
        {/* Match List */}
        <div className="border-2 px-10 py-5 rounded-md">
          <h1>Matches</h1>
          <div className="flex gap-4 my-4">
            {/* Team Dropdown */}
            <h1 className="text-xl font-bold bg-slate-500 px-4 flex items-center">
              Match:
            </h1>
            <select
              name="team"
              className="border py-2 px-10"
              onChange={(e) =>
                setMatch(matches.find((m) => m.id === e.target.value))
              }
            >
              <option value="">Select a Match</option>
              {matches.map((match) => (
                <option key={match.id} value={match.id}>
                  {match.first_team} vs {match.second_team} - {match.date}
                </option>
              ))}
            </select>
          </div>
           {/* Goals Section */}
      <div className="mt-5">
      <hr />
        <h1>Goals</h1>
        <div className="my-4">
          {/* Team Dropdown */}
          <h1 className="text-xl font-bold bg-slate-500 px-4 py-1 w-fit my-3">
            Team:
          </h1>
          <select name="equip" onChange={fillPlayers} className="border rounded-sm py-2 px-10">
            <option value="">Select a Team</option>
            <option value={match.first_team || ""}>
              {match.first_team || "Select a Match"}
            </option>
            <option value={match.second_team || ""}>
              {match.second_team || "Select a Match"}
            </option>
          </select>

         <div className="flex gap-4 ">
          <div className="">
             {/* Player Dropdown */}
           <h1 className="text-xl font-bold bg-slate-500 px-4  py-1 w-fit my-3">
            Player:
          </h1>
          <select name="player" className="border py-2 px-10" onChange={(e)=>setPlayer(e.target.value)}>
            <option value="">Select a Player</option>
            {players.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
          </div>
          <div className="">
             {/* Player Dropdown */}
           <h1 className="text-xl font-bold bg-slate-500 px-4  py-1 w-fit my-3">
            minute:
          </h1>
         <input type="number" name="minute" id="" min={0} max={130} className="border px-4 py-2" placeholder="10"  onChange={(e)=>setMinute(e.target.value)} value={minute}/>
          </div>
         </div>
        </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={addGoal}> Add Goal</button>
      </div>
        </div>
      </div>

     {matches.length > 0 && (
      <MatchesRes matches={matches} />
     )}


    </div>
  );
};

export default App;
