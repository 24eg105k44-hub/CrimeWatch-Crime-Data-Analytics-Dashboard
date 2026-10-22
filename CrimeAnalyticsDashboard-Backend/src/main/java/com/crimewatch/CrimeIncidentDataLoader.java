
package com.crimewatch;

import com.crimewatch.model.CrimeIncident;
import com.crimewatch.repository.CrimeIncidentJpaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CrimeIncidentDataLoader implements CommandLineRunner {

    private final CrimeIncidentJpaRepository repository;

    public CrimeIncidentDataLoader(CrimeIncidentJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }

        repository.save(new CrimeIncident(
            "CR-2481", "Burglary", "Burglary", "Central District",
            "402 Oak Street, Suite 300", "Oct 10, 2026", "09:42 AM",
            "Under review", "High", "Det. Marcus Vance (Badge #482)",
            "Commercial forced entry alarm at retail property. Rear glass door shattered, cash registers emptied.",
            "CCTV footage recovered from adjacent alleyway; forensic fingerprint samples collected."
        ));

        repository.save(new CrimeIncident(
            "CR-2480", "Vehicle theft", "Theft", "North Quarter",
            "810 Pine Ridge Ave (Parking Lot B)", "Oct 10, 2026", "08:17 AM",
            "Investigating", "Medium", "Officer Sarah Chen (Badge #619)",
            "Late-model silver SUV reported missing from office garage overnight. Keyless relay device suspected.",
            "Automated License Plate Reader (ALPR) hit registered at highway 101 North exit."
        ));

        repository.save(new CrimeIncident(
            "CR-2479", "Assault", "Assault", "East Borough",
            "Corner of 14th St & Lexington", "Oct 09, 2026", "11:36 PM",
            "Resolved", "High", "Sgt. David Miller (Badge #304)",
            "Physical altercation outside entertainment venue. Paramedics dispatched, victim treated for minor injuries.",
            "Suspect detained on-scene; witness statements recorded by patrol officers."
        ));

        repository.save(new CrimeIncident(
            "CR-2478", "Online fraud", "Fraud", "West End",
            "742 Meadowbrook Court", "Oct 09, 2026", "06:24 PM",
            "Investigating", "Low", "Cyber Unit Spec. Rivera (Badge #912)",
            "Elder financial scam involving fraudulent cryptocurrency investment portal. Losses estimated at $4,500.",
            "Transaction hashes, spoofed email headers, and IP connection logs secured."
        ));

        repository.save(new CrimeIncident(
            "CR-2477", "Street theft", "Theft", "Central District",
            "Metro Transit Station, Exit 2", "Oct 09, 2026", "02:05 PM",
            "Under review", "Medium", "Transit Officer Gomez (Badge #114)",
            "Pickpocketing report during peak commuter transit hour. Smartphone and credit cards taken.",
            "Station turnstile timestamp and surveillance camera feed queued for review."
        ));

        repository.save(new CrimeIncident(
            "CR-2476", "Vandalism", "Other", "South Industrial",
            "Warehouse Sector 4, Dock 12", "Oct 08, 2026", "04:15 AM",
            "Resolved", "Low", "Officer Tyler Ross (Badge #753)",
            "Graffiti tagging and security fence breach on commercial distribution perimeter.",
            "Paint canisters recovered; security patrol logs filed."
        ));

        repository.save(new CrimeIncident(
            "CR-2475", "Armed robbery", "Assault", "East Borough",
            "228 Highland Ave Convenience Store", "Oct 08, 2026", "10:48 PM",
            "Investigating", "High", "Det. Marcus Vance (Badge #482)",
            "Armed robbery at 24-hour convenience store. Suspect displayed firearm and demanded cash till.",
            "High-definition store camera audio/video; ballistic casings logged."
        ));

        repository.save(new CrimeIncident(
            "CR-2474", "Identity theft", "Fraud", "Central District",
            "350 Financial Plaza", "Oct 07, 2026", "11:15 AM",
            "Under review", "Medium", "Cyber Unit Spec. Rivera (Badge #912)",
            "Unauthorized credit accounts opened using victim credentials at multiple banking institutions.",
            "Credit bureau inquiry trails and forged identification scans gathered."
        ));

        repository.save(new CrimeIncident(
            "CR-2473", "Residential burglary", "Burglary", "West End",
            "1150 Elmwood Drive", "Oct 07, 2026", "03:30 PM",
            "Resolved", "High", "Sgt. David Miller (Badge #304)",
            "Forced side-window entry while homeowners were away. Jewelry and lockbox taken.",
            "Stolen goods recovered at local pawn shop; suspect apprehended."
        ));

        repository.save(new CrimeIncident(
            "CR-2472", "Bicycle theft", "Theft", "North Quarter",
            "University Arts Plaza Bike Rack", "Oct 06, 2026", "01:20 PM",
            "Resolved", "Low", "Campus Liaison Ward (Badge #210)",
            "Cable lock cut; high-end electric commuter bicycle stolen.",
            "Serial number verified on national database; bike recovered in North park."
        ));

        repository.save(new CrimeIncident(
            "CR-2471", "Narcotics possession", "Other", "South Industrial",
            "Freight Terminal Way & 3rd", "Oct 06, 2026", "09:05 PM",
            "Investigating", "Medium", "Task Force K-9 Unit (Badge #508)",
            "Suspicious vehicle search yielded controlled substances packaged for distribution.",
            "Narcotics sealed into evidence locker; chemical lab verification underway."
        ));

        repository.save(new CrimeIncident(
            "CR-2470", "Aggravated assault", "Assault", "Central District",
            "Grand Avenue & 6th St", "Oct 05, 2026", "01:45 AM",
            "Resolved", "High", "Officer Sarah Chen (Badge #619)",
            "Late night altercation resulting in blunt force injury. Emergency dispatch unit arrived within 3 minutes.",
            "Surveillance footage from hotel valet confirmed suspect identity."
        ));
    }
}
