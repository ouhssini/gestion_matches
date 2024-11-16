import React from 'react'

const MatchesRes = ({matches}) => {
  return (
    <div> 
    <table className="border  mt-5">
    <thead className="border bg-slate-400 ">
      <tr className="borderv px-4 py-3 ">
        <th  className="px-4 py-3 border text-center">Date</th>
        <th  className="px-4 py-3 border text-center">First Team</th>
        <th className="px-4 py-3 border text-center">Second Team</th>
        <th  className="px-4 py-3 border text-center">Goals</th>
      </tr>
    </thead>
    <tbody>
      {matches.map((match) => (
        <tr key={match.id}>
          <td  className="px-4 py-3 border text-center">{match.date}</td>
          <td  className="px-4 py-3 border text-center">{match.first_team}</td>
          <td  className="px-4 py-3 border text-center">{match.second_team}</td>
          <td  className="px-4 py-3 border text-center">
            <ul>
              {match.goals.map((goal, index) => (
                <li key={index}>
                  {goal.player} - {goal.minutes}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      ))}
    </tbody>
    </table>
</div>
  )
}

export default MatchesRes