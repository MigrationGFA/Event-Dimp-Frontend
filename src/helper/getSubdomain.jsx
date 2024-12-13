const getSubdomain = () => {
  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");

  console.log("this is hostname", domainParts);

  // Case 1: Handle 'localhost' (with or without a port)
  if (hostname === "localhost" || hostname.startsWith("localhost:")) {
    return null; // No subdomain for localhost
  }

  // Case 2: Handle base domain like 'dimpified.com'
  if (
    hostname === "dimpified.com" ||
    hostname === "www.dimpified.com" ||
    hostname === "https://dimpified.com.ng" ||
    hostname === "www.dimpified.com.ng" ||
    hostname === "dimpified.com.ng" ||
    hostname === "dimpified-frontend-testing.azurewebsites.net"
  ) {
    return null;
  }

  // Case 3: Handle subdomains (like 'paullo.dimpified.com' or 'paullo5.localhost:5173')
  if (domainParts.length > 1) {
    const subDomain = domainParts[0];
    localStorage.setItem("subDomain", subDomain);
    return subDomain;
  }

  return null;
};

export default getSubdomain;
