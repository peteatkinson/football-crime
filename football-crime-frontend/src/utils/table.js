const mapStadiumCrimeToTableRow = (sc) => {
  const { stadium, crimes } = sc;
  return {
    id: stadium.id,
    stadiumName: stadium.name,
    addressStreet: stadium.address.street,
    crimesCount: crimes.length,
  };
};

export { mapStadiumCrimeToTableRow };
