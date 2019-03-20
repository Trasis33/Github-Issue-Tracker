# URL to application: https://cscloud21.lnu.se

För att göra applikationen säker har jag använt mig av helmet som middleware. Den hjälper till att skydda mot:

### DNS prefetching

Webbläsaren kan börja leta upp domäners IP adresser även innan användaren har gått in på en länk. Helmet lägger in `X-DNS-Prefetch-Control` i headern som hindrar detta.

### Clickjacking

Genom att lägga ett osynligt klickbart lager över något användaren vill klicka på kan användaren luras att klicka på något hen inte vill.
Helmet hjälper till att hindra detta.

### Hide Powered-By

Helmet tar bort headern `X-Powered-By` för att inte klargöra teknologierna bakom servern.

### HSTS

Lägger till `Strict-Transport-Security` som ser till att användaren stannar kvar på HTTPS.

### NoSniff

Helmet sätter `X-COntent-Type-Options` till `nosniff` som hindrar webbläsaren att ta reda på vad för typ av fil användaren tittar på.

### XSS Filter

Minskar möjligheterna för Cross-Site Scripting.



Med Helmet har jag även manuellt ställt in Content Security Policy för att förhindra injektions-attacker.

På servern har jag konfigurerat en reversed proxy framför som redirectar till applikationen. Anslutningen är över HTTPS, och anslutningar till HTTP redirectas automatiskt till HTTPS.

Med en brandvägg har jag stängt alla portar förutom port 22, 80 och 443.

Med en middleware kollar jag om posts till webhooken faktiskt kommer från github.

### Reversed Proxy

En vanlig proxy är en server som vidarebefodrar requests från en klient till servern klienten vill nå.

En reversed proxy är likvärdig, dock med skillnaden att klienten inte vet att trafiken går igenom en proxy. I klientens ögon så pratar den direkt med servern den ville nå, alltså ligger en reversed proxy som ett skyddande lager mellan klient och server.

### Process Manager

en Process Manager är en behållare för applikationer som hjälper till att deploy'a, ha hand om och tillgängliggöra applikationen.

Jag använder PM2 i production-mode, med 4 instanser för load-balancing, reload'a utan down-time och monitorering.

### TLS Certifikat

Transport Layer Security är ett protokoll som krypterar och autentiserar kommunikationen mellan klienter och servrar.

Jag skapade ett certifikat för min domän med hjälp av letsencrypt.org för att tillåta kommunikation över HTTPS.

### Environment variables

En .env-variabel är en variabel med värden som man vill hålla utanför applikationen, till exempel känslig data som lösenord eller andra konfigurationer som applikationen ser som konstanta men sedan går att ändra i .env.

Jag använder en env fil med min GitHub Auth Token och en Secret som används för att jämföra med githubs payload för att säkerställa källan.
