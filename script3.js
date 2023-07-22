/**
 * Fetches statistics from an array of found links.
 * The function calculates the total number of links, unique links, and broken links.
 * @param {Array<{text: string, url: string, file: string, status: number | string, info: 'Valid' | 'Broken'}>} linksFound - 
 * An array of link objects containing link text, URL, originating file path, status code (for valid links), and info ('Valid' or 'Broken').
 * @returns {{total: number, unique: number, broken: number}} An object containing the statistics for the links found.
 * The returned object includes the total number of links, the count of unique links, and the count of broken links.
 */
const fetchStats = (linksFound) => {
  // Create a Set to store unique links.
  let setUniqueLinks = new Set();
  // Create an array to store broken links.
  let brokenLinks = [];
  // Iterate through the linksFound array and add each link's URL to the Set to ensure uniqueness.
  linksFound.map((link) => setUniqueLinks.add(link.url));
  // Filter the linksFound array to get an array of broken links.
  brokenLinks = linksFound.filter((link) => link.info == "Broken");
  // Return an object containing the statistics for the links found.
  return {
    total: linksFound.length,
    unique: setUniqueLinks.size,
    broken: brokenLinks.length,
  };
};

module.exports = fetchStats