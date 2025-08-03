const ASCIIBanner = () => {
  return (
    <div className="ascii-glow text-primary text-center font-mono">
      <pre className="text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre">
{`
          •••••••                  •••••• 
         ••     ••               •••     ••
        •••     ••••            •••        ••
        •••       •••            •••        •••
        •••       •••            •••        •••
        •••       •••            •••        •••
        •••      •••             •••       •••
         ••     •••                ••     •••
          ••••••                   ••••••

        •• •                                   ••••
         •••                              ••••
         •• •• •• ••• ••• ••• ••• •••  • •••
           •• •• ••• ••• ••• ••• •••  •• •
           • •• ••• ••• ••• ••• •••   ••
             ••    •           •    ••
               ••                  •
                 • •  ••   ••  •• •
                  `}
      </pre>
      <div className="mt-4 text-lg md:text-xl animate-glow">
        ABHIRAJ RANANAJAY SINGH
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        • Embedded Systems • Computer Vision • LLMs 
      </div>
    </div>
  );
};

export default ASCIIBanner;