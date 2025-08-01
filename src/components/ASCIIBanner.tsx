const ASCIIBanner = () => {
  return (
    <div className="ascii-glow text-primary text-center font-mono">
      <pre className="text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre">
{` ____  _     _ _ _             
|  _ \\| |__ (_) | | ___  _ __  
| |_) | '_ \\| | | |/ _ \\| '_ \\ 
|  __/| | | | | | | (_) | | | |
|_|   |_| |_|_|_|_|\\___/|_| |_|`}
      </pre>
      <div className="mt-4 text-lg md:text-xl animate-glow">
        ABHIRAJ RANANAJAY SINGH
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        Embedded Systems Engineer • M.Tech Transportation Engineering
      </div>
    </div>
  );
};

export default ASCIIBanner;