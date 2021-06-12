const mapStadiumCrimeToTableRow = (sc) => {
  const { stadium, crimes } = sc;
  return {
    id: stadium.id,
    stadium: stadium.name,
    street: stadium.address.street,
    crimesCount: crimes.length,
    team: stadium.team.name,
    teamCrestUrl: stadium.team.crestUrl
  };
};

export { mapStadiumCrimeToTableRow };
