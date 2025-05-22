// reactions-data.js - Comprehensive chemical reactions database for all elements

// Define comprehensive reactions for all elements
const elementReactionsData = {
    // ===== HYDROGEN (1) =====
    1: [
        {
            name: "Combustion of Hydrogen",
            equation: "2H₂(g) + O₂(g) → 2H₂O(g)",
            description: "Hydrogen gas reacts with oxygen gas in a highly exothermic reaction to form water vapor. This reaction releases a significant amount of energy and is the basis for hydrogen fuel cells.",
            conditions: ["Requires ignition (spark or catalyst)", "Highly exothermic", "Potentially explosive in confined spaces"],
            applications: "Used in fuel cells, rocket propulsion, and as a clean energy source.",
            reactionType: "Combustion"
        },
        {
            name: "Hydrogenation of Alkenes",
            equation: "R-CH=CH-R' + H₂ → R-CH₂-CH₂-R'",
            description: "Hydrogen adds across carbon-carbon double bonds (alkenes) in the presence of a metal catalyst, converting unsaturated compounds to saturated ones.",
            conditions: ["Metal catalyst (Pt, Pd, or Ni)", "Moderate temperature and pressure", "Reversible reaction"],
            applications: "Used in food industry to convert liquid oils to solid fats, in petrochemical industry, and in pharmaceutical synthesis.",
            reactionType: "Addition"
        },
        {
            name: "Hydrogen with Halogens",
            equation: "H₂(g) + X₂(g) → 2HX(g)  (where X = F, Cl, Br, I)",
            description: "Hydrogen reacts with halogens to form hydrogen halides. The reactivity decreases down the halogen group.",
            conditions: ["With F₂: Explosive at room temperature", "With Cl₂: Requires light", "With Br₂: Requires heat", "With I₂: Reversible and slow"],
            applications: "Production of hydrogen halides for industrial and laboratory use.",
            reactionType: "Synthesis"
        },
        {
            name: "Water-Gas Shift Reaction",
            equation: "CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)",
            description: "Carbon monoxide reacts with water vapor to produce carbon dioxide and hydrogen. This is an important industrial reaction for hydrogen production.",
            conditions: ["High temperature (200-500°C)", "Iron-chromium or copper-zinc catalyst", "Exothermic reaction"],
            applications: "Industrial production of hydrogen, used in ammonia synthesis and petroleum refining.",
            reactionType: "Redox"
        },
        {
            name: "Hydrogen with Metals",
            equation: "2M + nH₂ → 2MHₙ  (where M = metal)",
            description: "Many metals react with hydrogen to form metal hydrides. The reactivity depends on the metal's position in the activity series.",
            conditions: ["Varies by metal: some at room temperature, others require heat", "Often reversible", "Pressure dependent"],
            applications: "Hydrogen storage, reducing agents, battery technology, and as catalysts.",
            reactionType: "Synthesis"
        }
    ],
    
    // ===== HELIUM (2) =====
    2: [
        {
            name: "Limited Reactivity",
            equation: "He + X → No Reaction",
            description: "Helium is a noble gas with a completely filled outer electron shell, making it extremely unreactive under normal conditions.",
            conditions: ["Helium does not form stable compounds under normal conditions"],
            applications: "Helium's inertness makes it valuable as a carrier gas, coolant, and protective atmosphere for various industrial processes.",
            reactionType: "None"
        },
        {
            name: "Helium Excitation",
            equation: "He + Energy → He* → He + hν",
            description: "When helium atoms are excited by an electric discharge, they emit characteristic light when returning to the ground state. This is not a chemical reaction but a physical process.",
            conditions: ["Electrical discharge", "Low pressure"],
            applications: "Used in helium discharge lamps, plasma displays, and for spectroscopic analysis.",
            reactionType: "Physical process"
        },
        {
            name: "Theoretical Helium Compounds",
            equation: "Under extreme conditions: He + X → HeX",
            description: "Under extreme conditions (very high pressure or strong electric fields), helium might form metastable compounds or insertion compounds.",
            conditions: ["Extreme pressure (>100 GPa)", "Ultra-low temperatures", "Strong ionizing conditions"],
            applications: "Primarily of theoretical interest; potential applications in materials science under extreme conditions.",
            reactionType: "Theoretical"
        }
    ],
    
    // ===== LITHIUM (3) =====
    3: [
        {
            name: "Lithium with Water",
            equation: "2Li(s) + 2H₂O(l) → 2LiOH(aq) + H₂(g)",
            description: "Lithium reacts with water to produce lithium hydroxide and hydrogen gas. The reaction is less vigorous than other alkali metals with water.",
            conditions: ["Room temperature", "Exothermic reaction", "Lithium floats and moves on water surface"],
            applications: "Demonstration of alkali metal reactivity; lithium hydroxide used in batteries and as a CO₂ absorbent.",
            reactionType: "Single displacement"
        },
        {
            name: "Lithium with Oxygen",
            equation: "4Li(s) + O₂(g) → 2Li₂O(s)",
            description: "Lithium reacts with oxygen to form lithium oxide. Unlike other alkali metals that form peroxides or superoxides, lithium primarily forms the normal oxide.",
            conditions: ["Room temperature", "Lithium surface turns black/gray", "Exothermic reaction"],
            applications: "Lithium oxide is used in ceramics, glass, and as a flux for welding and soldering.",
            reactionType: "Synthesis"
        },
        {
            name: "Lithium with Nitrogen",
            equation: "6Li(s) + N₂(g) → 2Li₃N(s)",
            description: "Lithium is the only alkali metal that reacts directly with nitrogen at room temperature, forming lithium nitride.",
            conditions: ["Room temperature", "Exothermic reaction", "Red-brown product formation"],
            applications: "Lithium nitride is used in hydrogen storage materials, as a reagent in organic synthesis, and in lithium batteries.",
            reactionType: "Synthesis"
        },
        {
            name: "Lithium in Organic Synthesis",
            equation: "R-X + 2Li → R-Li + LiX",
            description: "Lithium metal reacts with organic halides to form organolithium compounds, which are important reagents in organic synthesis.",
            conditions: ["Anhydrous ether solvent", "Inert atmosphere", "Low temperature for control"],
            applications: "Organolithium compounds are used as strong bases and nucleophiles in pharmaceutical and fine chemical synthesis.",
            reactionType: "Organometallic"
        },
        {
            name: "Lithium Battery Reactions",
            equation: "Anode: Li → Li⁺ + e⁻\nCathode: Li⁺ + CoO₂ + e⁻ → LiCoO₂",
            description: "In lithium-ion batteries, lithium ions move from the anode to the cathode during discharge, and back during charging.",
            conditions: ["Non-aqueous electrolyte", "Controlled charge/discharge rates", "Temperature sensitive"],
            applications: "Powers mobile phones, laptops, electric vehicles, and many other portable electronic devices.",
            reactionType: "Electrochemical"
        }
    ],
    
    // ===== BERYLLIUM (4) =====
    4: [
        {
            name: "Beryllium with Oxygen",
            equation: "2Be(s) + O₂(g) → 2BeO(s)",
            description: "Beryllium reacts with oxygen to form beryllium oxide. At room temperature, a thin oxide layer forms on the surface, protecting the metal from further oxidation.",
            conditions: ["Room temperature (slow reaction)", "At high temperatures (rapid and complete)", "Exothermic reaction"],
            applications: "Beryllium oxide is used in ceramics, as a nuclear moderator, and in high-performance electronics due to its high thermal conductivity.",
            reactionType: "Synthesis"
        },
        {
            name: "Beryllium with Acids",
            equation: "Be(s) + 2HCl(aq) → BeCl₂(aq) + H₂(g)",
            description: "Beryllium reacts with strong acids to produce beryllium salts and hydrogen gas. The amphoteric nature allows it to react with both acids and strong bases.",
            conditions: ["Room temperature", "Enhanced by surface oxide removal", "Exothermic reaction"],
            applications: "Production of beryllium salts for various applications; demonstration of amphoteric behavior.",
            reactionType: "Single displacement"
        },
        {
            name: "Beryllium with Strong Bases",
            equation: "Be(s) + 2NaOH(aq) + 2H₂O(l) → Na₂[Be(OH)₄](aq) + H₂(g)",
            description: "Being amphoteric, beryllium reacts with strong bases to form beryllate complexes and hydrogen gas.",
            conditions: ["Concentrated base solution", "Room temperature or slight heating", "Reaction limited by oxide layer"],
            applications: "Separation of beryllium from other metals; demonstration of amphoteric character.",
            reactionType: "Complex formation"
        },
        {
            name: "Beryllium Carbide Formation",
            equation: "2Be(s) + C(s) → Be₂C(s)",
            description: "Beryllium reacts with carbon at high temperatures to form beryllium carbide.",
            conditions: ["High temperature (>1500°C)", "Inert atmosphere", "Carbon source (graphite)"],
            applications: "Beryllium carbide has been studied as a neutron moderator and reflector in nuclear applications.",
            reactionType: "Synthesis"
        },
        {
            name: "Beryllium Halide Formation",
            equation: "Be(s) + X₂(g) → BeX₂(s)  (where X = F, Cl, Br, I)",
            description: "Beryllium reacts with halogens to form beryllium halides, which have covalent character unlike other alkaline earth metal halides.",
            conditions: ["Elevated temperature", "Dry conditions", "Different temperatures required for different halogens"],
            applications: "Beryllium halides are used as Lewis acids, catalysts, and in some specialized synthesis reactions.",
            reactionType: "Synthesis"
        }
    ],
    
    // ===== BORON (5) =====
    5: [
        {
            name: "Boron with Oxygen",
            equation: "4B(s) + 3O₂(g) → 2B₂O₃(s)",
            description: "Boron reacts with oxygen to form boron trioxide. At room temperature, boron is relatively inert, but it burns at high temperatures.",
            conditions: ["High temperature (>700°C)", "Complete combustion", "White flame"],
            applications: "Boron trioxide is used in glass and ceramic production, as a flux for soldering, and in fiberglass production.",
            reactionType: "Combustion"
        },
        {
            name: "Boron with Strong Acids",
            equation: "2B(s) + 6HCl(aq) → 2BCl₃(g) + 3H₂(g)",
            description: "Boron reacts with strong, hot acids to form boron halides and hydrogen gas.",
            conditions: ["Concentrated acids", "Elevated temperature", "Generation of toxic gases possible"],
            applications: "Production of boron halides for use as Lewis acids and in organic synthesis.",
            reactionType: "Single displacement"
        },
        {
            name: "Boron with Nitrogen",
            equation: "B(s) + N(g) → BN(s)",
            description: "Boron reacts with nitrogen at high temperatures to form boron nitride, which exists in several crystal structures similar to carbon allotropes.",
            conditions: ["High temperature (>1000°C)", "Nitrogen atmosphere", "Possible catalysts"],
            applications: "Hexagonal boron nitride is used as a lubricant; cubic boron nitride is used as an abrasive nearly as hard as diamond.",
            reactionType: "Synthesis"
        },
        {
            name: "Boron Hydride Formation",
            equation: "Complex multi-step reactions forming B₂H₆ and other boranes",
            description: "Boron forms various hydrides (boranes) through complex reactions. These compounds have unusual electron-deficient bonding.",
            conditions: ["Specialized laboratory conditions", "Often requires complex synthesis routes", "Highly reactive products"],
            applications: "Boranes are used as reducing agents, in rocket fuels, and as precursors in synthetic chemistry.",
            reactionType: "Complex synthesis"
        },
        {
            name: "Boron with Metals",
            equation: "2M + nB → 2MBₙ  (where M = metal)",
            description: "Boron forms metal borides with many metals, often with high melting points and hardness.",
            conditions: ["High temperature", "Direct combination or reduction methods", "Various stoichiometries possible"],
            applications: "Metal borides are used as hard materials, refractory compounds, and in cutting tools.",
            reactionType: "Synthesis"
        }
    ],
    
    // ===== CARBON (6) =====
    6: [
        {
            name: "Combustion of Carbon",
            equation: "C(s) + O₂(g) → CO₂(g)",
            description: "Carbon reacts with oxygen in an exothermic reaction to form carbon dioxide. With limited oxygen, carbon monoxide can form instead.",
            conditions: ["Heat or ignition source", "Exothermic reaction", "Rate depends on carbon form (graphite, charcoal, etc.)"],
            applications: "Basis for fossil fuel combustion, energy production, and many industrial processes.",
            reactionType: "Combustion"
        },
        {
            name: "Formation of Carbon Monoxide",
            equation: "2C(s) + O₂(g) → 2CO(g)",
            description: "In limited oxygen supply, carbon forms carbon monoxide instead of carbon dioxide.",
            conditions: ["Limited oxygen supply", "High temperature", "Incomplete combustion"],
            applications: "CO is an important industrial reducing agent in metallurgy, especially in iron production.",
            reactionType: "Incomplete combustion"
        },
        {
            name: "Carbon with Steam",
            equation: "C(s) + H₂O(g) → CO(g) + H₂(g)",
            description: "Carbon reacts with steam at high temperatures to produce carbon monoxide and hydrogen gas (water gas).",
            conditions: ["High temperature (>800°C)", "Steam environment", "Endothermic reaction"],
            applications: "This reaction is used in coal gasification and to produce synthesis gas for industrial processes.",
            reactionType: "Redox"
        },
        {
            name: "Carbon Dioxide Reduction",
            equation: "C(s) + CO₂(g) → 2CO(g)",
            description: "Carbon reduces carbon dioxide to carbon monoxide at high temperatures. This reaction is important in metallurgy.",
            conditions: ["High temperature (>700°C)", "Endothermic reaction"],
            applications: "Used in metal extraction processes, particularly in blast furnaces for iron production.",
            reactionType: "Redox"
        },
        {
            name: "Carbon with Metals",
            equation: "xM + yC → MₓCᵧ",
            description: "Carbon forms carbides with many metals, which can be ionic, covalent, or metallic in nature.",
            conditions: ["High temperature", "Direct combination or in carbon-rich environment", "Various stoichiometries"],
            applications: "Metal carbides like tungsten carbide are used in cutting tools; calcium carbide is used to produce acetylene.",
            reactionType: "Synthesis"
        },
        {
            name: "Organic Synthesis",
            equation: "Various reactions forming C-C and C-H bonds",
            description: "Carbon's ability to form strong bonds with itself and other elements is the basis of organic chemistry, with millions of possible compounds.",
            conditions: ["Varies widely depending on specific reaction", "Often requires catalysts", "Temperature and pressure dependent"],
            applications: "Forms the basis of life, pharmaceuticals, plastics, fuels, and countless other materials.",
            reactionType: "Various"
        }
    ],
    
    // ===== NITROGEN (7) =====
    7: [
        {
            name: "Haber Process",
            equation: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
            description: "Nitrogen gas reacts with hydrogen gas to form ammonia in this equilibrium reaction. This is one of the most important industrial chemical processes.",
            conditions: ["High pressure (150-300 atm)", "Moderate temperature (400-500°C)", "Iron catalyst", "Exothermic reaction"],
            applications: "Production of fertilizers, nitric acid, explosives, and various nitrogen compounds.",
            reactionType: "Synthesis"
        },
        {
            name: "Nitrogen Fixation (Biological)",
            equation: "N₂(g) + 8H⁺ + 8e⁻ → 2NH₃ + H₂",
            description: "Biological nitrogen fixation occurs in certain bacteria using the nitrogenase enzyme complex to convert atmospheric nitrogen to ammonia.",
            conditions: ["Enzyme-catalyzed (nitrogenase)", "Anaerobic conditions", "Energy input (ATP)", "Presence of fixed carbon"],
            applications: "Critical for nitrogen cycling in ecosystems; the basis for legume-rhizobium symbiosis in agriculture.",
            reactionType: "Biochemical"
        },
        {
            name: "Formation of Nitrogen Oxides",
            equation: "N₂(g) + O₂(g) → 2NO(g)",
            description: "Nitrogen reacts with oxygen at high temperatures to form nitrogen monoxide (nitric oxide), which can further oxidize to nitrogen dioxide.",
            conditions: ["Very high temperature (>2000°C)", "Lightning, combustion engines, or electric arc", "Endothermic reaction"],
            applications: "Important in atmospheric chemistry; industrial production of nitric acid; forms in internal combustion engines.",
            reactionType: "Synthesis"
        },
        {
            name: "Ostwald Process",
            equation: "4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g)\n2NO(g) + O₂(g) → 2NO₂(g)\n3NO₂(g) + H₂O(l) → 2HNO₃(aq) + NO(g)",
            description: "Multi-step process converting ammonia to nitric acid through nitrogen oxide intermediates.",
            conditions: ["Platinum-rhodium catalyst for first step", "High temperature for ammonia oxidation", "Absorption towers for final conversion"],
            applications: "Industrial production of nitric acid, which is used in fertilizers, explosives, and many industrial processes.",
            reactionType: "Oxidation"
        },
        {
            name: "Reaction with Metals",
            equation: "3M + N₂ → M₃N₂  (where M = highly reactive metal)",
            description: "Nitrogen reacts directly with some highly reactive metals like lithium, magnesium (at high temperature), and certain transition metals.",
            conditions: ["Varies by metal: lithium at room temperature, others require heat", "Direct combination", "Often slow reaction"],
            applications: "Metal nitrides are used in ceramics, as catalysts, and in semiconductor devices.",
            reactionType: "Synthesis"
        }
    ],
    
    // ===== OXYGEN (8) =====
    8: [
        {
            name: "Combustion Reactions",
            equation: "Fuel + O₂ → CO₂ + H₂O + Energy",
            description: "Oxygen supports combustion by reacting with various fuels in exothermic reactions, typically producing carbon dioxide and water.",
            conditions: ["Ignition source or high temperature", "Highly exothermic", "Rate depends on fuel type and oxygen concentration"],
            applications: "Energy production, heating, power generation, and metallurgical processes.",
            reactionType: "Combustion"
        },
        {
            name: "Metal Oxidation",
            equation: "xM + yO₂ → MₓO₂ᵧ  (where M = metal)",
            description: "Oxygen reacts with metals to form metal oxides. The reactivity varies widely across the periodic table.",
            conditions: ["Some metals react at room temperature, others require heating", "Exothermic reactions", "Some form protective oxide layers"],
            applications: "Metallurgy, corrosion, metal extraction, and metal oxide materials for various applications.",
            reactionType: "Oxidation"
        },
        {
            name: "Biological Respiration",
            equation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy",
            description: "In cellular respiration, oxygen is used to oxidize glucose (and other nutrients) to produce carbon dioxide, water, and energy (ATP).",
            conditions: ["Enzyme-catalyzed", "Body temperature", "Series of complex biochemical reactions", "Occurs in mitochondria"],
            applications: "The fundamental energy-producing process for aerobic organisms, including humans.",
            reactionType: "Biochemical oxidation"
        },
        {
            name: "Ozone Formation",
            equation: "3O₂(g) → 2O₃(g)",
            description: "Oxygen can be converted to ozone by electrical discharge or UV radiation. This involves breaking O₂ bonds to form O₃.",
            conditions: ["Electrical discharge or UV radiation", "Endothermic reaction", "Unstable product at standard conditions"],
            applications: "Water purification, air disinfection, industrial oxidation processes, and naturally in the ozone layer.",
            reactionType: "Photochemical/Electrical"
        },
        {
            name: "Non-metal Oxidation",
            equation: "Non-metal + O₂ → Non-metal oxide",
            description: "Oxygen reacts with non-metals to form non-metal oxides, which typically have acidic properties when dissolved in water.",
            conditions: ["Varies by non-metal: some spontaneous, others require heating", "Different stoichiometries possible", "Often exothermic"],
            applications: "Production of important acids and industrial chemicals; environmental concerns with sulfur and nitrogen oxides.",
            reactionType: "Oxidation"
        },
        {
            name: "Corrosion Reactions",
            equation: "4Fe + 3O₂ + 2H₂O → 4FeO(OH)",
            description: "Oxygen participates in corrosion processes, such as rusting of iron, where metals are oxidized in the presence of oxygen and moisture.",
            conditions: ["Presence of moisture", "Often accelerated by salts or acids", "Electrochemical process", "Temperature dependent"],
            applications: "Understanding and preventing corrosion is crucial in infrastructure, transportation, and manufacturing.",
            reactionType: "Redox"
        }
    ],
    
    // ===== FLUORINE (9) =====
    9: [
        {
            name: "Fluorine with Hydrogen",
            equation: "F₂(g) + H₂(g) → 2HF(g)",
            description: "Fluorine reacts explosively with hydrogen even in dark and cold conditions to form hydrogen fluoride. This is one of the most exothermic reactions known.",
            conditions: ["Explosive at room temperature", "Proceeds in dark", "Extremely exothermic", "Potential chain reaction"],
            applications: "Production of hydrogen fluoride, which is used in aluminum production, uranium processing, and etching glass.",
            reactionType: "Synthesis"
        },
        {
            name: "Fluorination of Metals",
            equation: "M + nF₂ → MF₂ₙ  (where M = metal)",
            description: "Fluorine reacts with virtually all metals, forming metal fluorides. Even metals like platinum and gold react directly with fluorine.",
            conditions: ["Often violent and exothermic", "Some reactions incandescent", "Temperatures depend on the metal"],
            applications: "Production of metal fluorides for various industrial uses, including catalysts, electrodes, and specialty materials.",
            reactionType: "Oxidation"
        },
        {
            name: "Fluorination of Non-metals",
            equation: "E + nF₂ → EF₂ₙ  (where E = non-metal)",
            description: "Fluorine reacts with non-metals to form non-metal fluorides. The reactions are typically vigorous and exothermic.",
            conditions: ["Usually spontaneous at room temperature", "Highly exothermic", "May be explosive", "Different stoichiometries possible"],
            applications: "Production of compounds like SF₆ (electrical insulator), CF₄ (refrigerant), and others for various industrial applications.",
            reactionType: "Synthesis"
        },
        {
            name: "Fluorination of Water",
            equation: "2F₂(g) + 2H₂O(l) → 4HF(aq) + O₂(g)",
            description: "Fluorine reacts violently with water, producing hydrogen fluoride and oxygen. This demonstrates fluorine's extreme oxidizing power.",
            conditions: ["Extremely violent reaction", "Explosive", "Produces toxic hydrogen fluoride", "Highly exothermic"],
            applications: "Primarily of theoretical interest due to extreme reactivity; demonstrates fluorine's power as an oxidizer.",
            reactionType: "Redox"
        },
        {
            name: "Organic Fluorination",
            equation: "R-H + F₂ → R-F + HF",
            description: "Fluorine reacts with organic compounds, replacing hydrogen atoms with fluorine. The reactions can be difficult to control due to fluorine's reactivity.",
            conditions: ["Often requires dilution of F₂", "Low temperature", "Sometimes requires catalysts", "Potentially destructive to organic structures"],
            applications: "Production of organofluorine compounds for pharmaceuticals, materials science, and agrochemicals.",
            reactionType: "Substitution"
        },
        {
            name: "Fluorination of Noble Gases",
            equation: "Xe + nF₂ → XeFₙ  (n = 2, 4, 6)",
            description: "Fluorine is one of the few elements that can react with noble gases, particularly xenon and krypton, forming noble gas compounds.",
            conditions: ["High pressure", "Electric discharge or UV light", "Controlled temperature", "Specialized equipment"],
            applications: "Primarily of academic interest; some XeF compounds are used as powerful oxidizing and fluorinating agents.",
            reactionType: "Synthesis"
        }
    ],
    
    // ===== NEON (10) =====
    10: [
        {
            name: "Limited Reactivity",
            equation: "Ne + X → No Reaction",
            description: "Neon is a noble gas with a completely filled outer electron shell, making it extremely unreactive. No stable neon compounds have been confirmed under normal conditions.",
            conditions: ["Neon does not form stable compounds under normal conditions"],
            applications: "Neon's inertness makes it valuable in discharge tubes, lighting, lasers, and cryogenic applications.",
            reactionType: "None"
        },
        {
            name: "Neon Excitation",
            equation: "Ne + Energy → Ne* → Ne + hν",
            description: "When neon atoms are excited by an electric discharge, they emit characteristic red-orange light when returning to the ground state. This is not a chemical reaction but a physical process.",
            conditions: ["Electrical discharge", "Low pressure"],
            applications: "Used in neon signs, plasma displays, and for spectroscopic analysis.",
            reactionType: "Physical process"
        },
        {
            name: "Theoretical Neon Compounds",
            equation: "Under extreme conditions: Ne + X → [Speculative]",
            description: "Unlike xenon, neon's extremely stable electron configuration makes even theoretical compounds difficult to predict. Some computational studies suggest the possibility of neon compounds under extreme pressure.",
            conditions: ["Extreme pressure (>1000 GPa)", "Ultra-low temperatures", "Theoretical only"],
            applications: "Currently purely theoretical with no practical applications.",
            reactionType: "Theoretical"
        }
    ],
    
    // ===== SODIUM (11) =====
    11: [
        {
            name: "Sodium with Water",
            equation: "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)",
            description: "Sodium reacts vigorously with water to produce sodium hydroxide and hydrogen gas. The reaction is exothermic enough to ignite the hydrogen produced.",
            conditions: ["Room temperature", "Highly exothermic", "Sodium melts and forms a sphere that moves rapidly on water", "Hydrogen may ignite"],
            applications: "Demonstration of alkali metal reactivity; production of sodium hydroxide (important industrial base).",
            reactionType: "Single displacement"
        },
        {
            name: "Sodium with Oxygen",
            equation: "4Na(s) + O₂(g) → 2Na₂O(s)  [main product: Na₂O₂]",
            description: "Sodium burns in oxygen to form primarily sodium peroxide (Na₂O₂) rather than the normal oxide (Na₂O), showing sodium's strong reducing ability.",
            conditions: ["Ignition required", "Burns with bright yellow flame", "Exothermic reaction", "Moisture sensitive products"],
            applications: "Sodium peroxide is used as a bleaching agent, oxidizing agent, and oxygen source in some applications.",
            reactionType: "Synthesis"
        },
        {
            name: "Sodium with Halogens",
            equation: "2Na(s) + X₂ → 2NaX  (where X = F, Cl, Br, I)",
            description: "Sodium reacts vigorously with halogens to form sodium halides. The reactions are highly exothermic.",
            conditions: ["Often spontaneous", "Exothermic", "May be violent with F₂ and Cl₂", "Less vigorous with heavier halogens"],
            applications: "Production of sodium halides for various applications, including table salt (NaCl), water fluoridation (NaF), and photography (NaBr, NaI).",
            reactionType: "Synthesis"
        },
        {
            name: "Sodium in Liquid Ammonia",
            equation: "Na(s) + NH₃(l) → Na⁺(am) + e⁻(am)",
            description: "Sodium dissolves in liquid ammonia to give a deep blue solution containing solvated electrons, which are powerful reducing agents.",
            conditions: ["Low temperature (-33°C or below)", "Anhydrous conditions", "Blue solution at low concentrations, bronze at high concentrations"],
            applications: "Powerful reducing agent in organic synthesis; used in Birch reduction of aromatic compounds.",
            reactionType: "Solution"
        },
        {
            name: "Sodium-Mercury Amalgam",
            equation: "Na(s) + Hg(l) → Na(Hg)  [amalgam]",
            description: "Sodium dissolves in mercury to form sodium amalgam, which is less reactive than pure sodium and can be used as a controlled reducing agent.",
            conditions: ["Room temperature", "Often exothermic", "Forms liquid or solid depending on concentration"],
            applications: "Used as a reducing agent in organic synthesis, chlor-alkali process, and in some metallurgical applications.",
            reactionType: "Formation of alloy"
        },
        {
            name: "Sodium with Acids",
            equation: "2Na(s) + 2HCl(aq) → 2NaCl(aq) + H₂(g)",
            description: "Sodium reacts vigorously with acids to produce sodium salts and hydrogen gas. The reaction is highly exothermic.",
            conditions: ["Extremely vigorous, potentially explosive", "Highly exothermic", "Even dilute acids react violently"],
            applications: "Production of sodium salts; demonstration of metal-acid reactions (though dangerous with sodium).",
            reactionType: "Single displacement"
        }
    ],
    
    // Continue with more elements...
    // ===== MAGNESIUM (12) =====
    12: [
        {
            name: "Magnesium Combustion",
            equation: "2Mg(s) + O₂(g) → 2MgO(s)",
            description: "Magnesium burns in oxygen with a brilliant white flame to form magnesium oxide. The reaction is highly exothermic and the light produced is rich in UV radiation.",
            conditions: ["Ignition required to overcome oxide layer", "Burns with intense white light", "Continues burning in CO₂ or N₂", "Difficult to extinguish"],
            applications: "Used in flash photography, fireworks, flares, and as a lightweight structural metal.",
            reactionType: "Combustion"
        },
        {
            name: "Magnesium with Water",
            equation: "Mg(s) + 2H₂O(l) → Mg(OH)₂(s) + H₂(g)",
            description: "Magnesium reacts slowly with cold water, but the reaction rate increases with temperature. With steam, the reaction is much faster.",
            conditions: ["Slow at room temperature due to oxide layer", "Much faster with hot water or steam", "Exothermic reaction"],
            applications: "Demonstrates reactivity of alkaline earth metals; magnesium hydroxide is used as an antacid and laxative.",
            reactionType: "Single displacement"
        },
        {
            name: "Magnesium with Acids",
            equation: "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)",
            description: "Magnesium reacts readily with acids to produce magnesium salts and hydrogen gas. The reaction is faster than with water because acids dissolve the protective oxide layer.",
            conditions: ["Room temperature", "Vigorous reaction", "Exothermic", "More controlled than alkali metals"],
            applications: "Laboratory preparation of hydrogen; production of magnesium salts; demonstration of metal-acid reactions.",
            reactionType: "Single displacement"
        },
        {
            name: "Magnesium with Nitrogen",
            equation: "3Mg(s) + N₂(g) → Mg₃N₂(s)",
            description: "Magnesium reacts with nitrogen at high temperatures to form magnesium nitride, which reacts with water to produce ammonia.",
            conditions: ["High temperature (>600°C)", "Direct combination", "Exothermic once initiated"],
            applications: "Magnesium nitride can be used to produce ammonia when hydrolyzed; used in some specialized ceramic materials.",
            reactionType: "Synthesis"
        },
        {
            name: "Magnesium in Organic Synthesis",
            equation: "Mg(s) + R-X → R-Mg-X  (Grignard reagent)",
            description: "Magnesium reacts with organic halides to form Grignard reagents, which are important in organic synthesis for creating new carbon-carbon bonds.",
            conditions: ["Anhydrous ether solvent", "Dry conditions", "Inert atmosphere", "Often requires initiation"],
            applications: "Grignard reagents are widely used in pharmaceutical synthesis, fine chemicals, and research chemistry.",
            reactionType: "Organometallic"
        },
        {
            name: "Thermite Reaction with Iron Oxide",
            equation: "3Mg(s) + Fe₂O₃(s) → 3MgO(s) + 2Fe(l)",
            description: "Magnesium can reduce iron oxide in the thermite reaction, producing molten iron and magnesium oxide. The reaction is highly exothermic.",
            conditions: ["Ignition required", "Extremely high temperature produced (>2500°C)", "Highly exothermic", "Self-sustaining once started"],
            applications: "Welding of railroad rails, military incendiaries, and metal casting in remote locations.",
            reactionType: "Redox"
        }
    ],
    
    // ===== ALUMINUM (13) =====
    13: [
        {
            name: "Aluminum Oxidation",
            equation: "4Al(s) + 3O₂(g) → 2Al₂O₃(s)",
            description: "Aluminum reacts with oxygen to form aluminum oxide. A thin oxide layer forms rapidly on the surface, protecting the metal from further oxidation.",
            conditions: ["Spontaneous at room temperature", "Forms protective layer", "Powdered aluminum can burn vigorously", "Highly exothermic"],
            applications: "The protective oxide layer makes aluminum resistant to corrosion, ideal for outdoor applications. Aluminum oxide is used as an abrasive and in ceramics.",
            reactionType: "Oxidation"
        },
        {
            name: "Aluminum with Acids",
            equation: "2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)",
            description: "Aluminum reacts with non-oxidizing acids to form aluminum salts and hydrogen gas. The reaction occurs after the protective oxide layer is dissolved.",
            conditions: ["Room temperature", "Faster with concentrated acids", "Exothermic reaction", "Requires breaking oxide layer"],
            applications: "Production of aluminum salts; hydrogen generation; metal cleaning and pickling.",
            reactionType: "Single displacement"
        },
        {
            name: "Aluminum with Strong Bases",
            equation: "2Al(s) + 2NaOH(aq) + 6H₂O(l) → 2Na[Al(OH)₄](aq) + 3H₂(g)",
            description: "Being amphoteric, aluminum reacts with strong bases to form aluminate ions and hydrogen gas.",
            conditions: ["Room temperature", "Vigorous with concentrated bases", "Dissolves protective oxide layer", "Exothermic"],
            applications: "Aluminum cleaning; production of hydrogen; demonstrating amphoteric behavior; metal etching processes.",
            reactionType: "Complex formation"
        },
        {
            name: "Thermite Reaction",
            equation: "2Al(s) + Fe₂O₃(s) → 2Fe(l) + Al₂O₃(s)",
            description: "Aluminum powder reacts with iron(III) oxide in the thermite reaction, producing molten iron and aluminum oxide with the release of enormous heat.",
            conditions: ["Ignition required (usually magnesium ribbon)", "Extremely high temperature (>2500°C)", "Self-sustaining once started", "Highly exothermic"],
            applications: "Welding railroad rails, metal casting, military incendiaries, and in some pyrotechnics.",
            reactionType: "Redox"
        },
        {
            name: "Aluminum with Halogens",
            equation: "2Al(s) + 3X₂ → 2AlX₃  (where X = F, Cl, Br, I)",
            description: "Aluminum reacts vigorously with halogens to form aluminum halides. The reactivity decreases down the halogen group.",
            conditions: ["Exothermic reactions", "Can be violent with F₂ and Cl₂", "May require heating for Br₂ and I₂", "Anhydrous conditions preferred"],
            applications: "Production of aluminum halides for catalysts, organic synthesis, and antiperspirants (aluminum chlorohydrate).",
            reactionType: "Synthesis"
        },
        {
            name: "Hall-Héroult Process",
            equation: "Al₂O₃(dissolved) + 3C(s) → 2Al(l) + 3CO₂(g)",
            description: "In aluminum production, aluminum oxide is electrolytically reduced to aluminum metal using carbon anodes, which are oxidized to carbon dioxide.",
            conditions: ["High temperature (950-980°C)", "Cryolite (Na₃AlF₆) as solvent", "Electrolytic process", "Carbon anodes"],
            applications: "Primary industrial process for aluminum production worldwide.",
            reactionType: "Electrolysis"
        }
    ],
    
    // ===== SILICON (14) =====
    14: [
        {
            name: "Silicon Oxidation",
            equation: "Si(s) + O₂(g) → SiO₂(s)",
            description: "Silicon reacts with oxygen to form silicon dioxide (silica). At room temperature, a thin protective oxide layer forms on the surface.",
            conditions: ["Slow at room temperature", "Forms protective layer", "More rapid at high temperatures", "Exothermic reaction"],
            applications: "The oxide layer is crucial in semiconductor fabrication; silicon dioxide is used in glass, ceramics, and as an electrical insulator.",
            reactionType: "Oxidation"
        },
        {
            name: "Silicon with Hydrofluoric Acid",
            equation: "Si(s) + 6HF(aq) → H₂SiF₆(aq) + 2H₂(g)",
            description: "Silicon reacts with hydrofluoric acid, one of the few acids that can dissolve it, forming hexafluorosilicic acid and hydrogen gas.",
            conditions: ["Room temperature", "HF dissolves the protective oxide layer", "Releases toxic gases", "Hazardous reaction"],
            applications: "Etching silicon in semiconductor manufacturing; glass etching; creating microstructures in MEMS devices.",
            reactionType: "Dissolution"
        },
        {
            name: "Silicon with Strong Bases",
            equation: "Si(s) + 2NaOH(aq) + H₂O(l) → Na₂SiO₃(aq) + 2H₂(g)",
            description: "Silicon reacts with hot concentrated bases to form silicates and hydrogen gas.",
            conditions: ["Elevated temperature", "Concentrated base solution", "Relatively slow reaction", "Dissolves protective oxide layer"],
            applications: "Production of silicates for detergents, adhesives, and various industrial applications.",
            reactionType: "Dissolution"
        },
        {
            name: "Silicon with Halogens",
            equation: "Si(s) + 2X₂ → SiX₄  (where X = F, Cl, Br, I)",
            description: "Silicon reacts with halogens to form silicon tetrahalides. The reactions are typically exothermic.",
            conditions: ["Exothermic reactions", "F₂ and Cl₂ react at room temperature", "Br₂ and I₂ may require heating", "Anhydrous conditions preferred"],
            applications: "Silicon tetrahalides are used in semiconductor processing, as precursors for silicon deposition, and in organic synthesis.",
            reactionType: "Synthesis"
        },
        {
            name: "Formation of Silanes",
            equation: "Si(s) + reagents → SiH₄ and higher silanes",
            description: "Silicon can form various hydrides called silanes, analogous to alkanes but much more reactive.",
            conditions: ["Complex laboratory synthesis", "Highly reactive products", "Pyrophoric in air", "Specialized handling required"],
            applications: "Silanes are used as reducing agents, in semiconductor fabrication, and as intermediates in organosilicon chemistry.",
            reactionType: "Complex synthesis"
        },
        {
            name: "Silicon in Semiconductor Doping",
            equation: "Si + dopant → Si(dopant)",
            description: "Silicon can be doped with elements like boron (p-type) or phosphorus (n-type) to modify its electrical properties for semiconductor applications.",
            conditions: ["High temperature process", "Ultra-pure materials", "Controlled atmosphere", "Precision required"],
            applications: "Fundamental to modern electronics - transistors, integrated circuits, solar cells, and all silicon-based electronic devices.",
            reactionType: "Solid-state"
        }
    ],

    // Continue with more elements...
    // This would be a very large dataset with all 118 elements
    
    // Example of a transition metal
    // ===== IRON (26) =====
    26: [
        {
            name: "Iron Oxidation (Rusting)",
            equation: "4Fe(s) + 3O₂(g) + 2H₂O(l) → 2Fe₂O₃·H₂O(s)",
            description: "Iron gradually reacts with oxygen in the presence of moisture to form hydrated iron(III) oxide, commonly known as rust.",
            conditions: ["Room temperature", "Presence of moisture accelerates the reaction", "Electrochemical process", "Salt accelerates the process"],
            applications: "Understanding this reaction is crucial for preventing corrosion of iron-based materials and structures.",
            reactionType: "Oxidation"
        },
        {
            name: "Iron with Acids",
            equation: "Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g)",
            description: "Iron reacts with non-oxidizing acids to form iron(II) salts and hydrogen gas.",
            conditions: ["Room temperature", "More vigorous with concentrated acids", "Exothermic reaction"],
            applications: "Production of iron salts; metal cleaning and pickling; removal of rust.",
            reactionType: "Single displacement"
        },
        {
            name: "Iron in Blast Furnace",
            equation: "Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g)",
            description: "In iron extraction, iron ore (primarily Fe₂O₃) is reduced by carbon monoxide to produce molten iron. This is the primary industrial process for iron production.",
            conditions: ["High temperature (1500-2000°C)", "Multiple zones in furnace with different reactions", "Complex series of reactions", "Continuous process"],
            applications: "Primary method for iron production worldwide; fundamental to modern infrastructure and manufacturing.",
            reactionType: "Redox"
        },
        {
            name: "Iron with Halogens",
            equation: "2Fe(s) + 3X₂ → 2FeX₃  (where X = F, Cl, Br, I)",
            description: "Iron reacts with halogens to form iron(III) halides. The reactivity follows the pattern F₂ > Cl₂ > Br₂ > I₂.",
            conditions: ["Exothermic reactions", "Can be violent with F₂", "May require heating for heavier halogens", "Anhydrous conditions preferred"],
            applications: "Iron halides are used as catalysts, in organic synthesis, and in some specialized applications.",
            reactionType: "Synthesis"
        },
        {
            name: "Iron with Steam",
            equation: "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)",
            description: "Iron reacts with steam at high temperatures to form magnetite (Fe₃O₄) and hydrogen gas. This reaction was historically used in the 'water gas shift' process.",
            conditions: ["High temperature (>500°C)", "Steam environment", "Reversible reaction"],
            applications: "Historically used for hydrogen production; water gas shift reaction; understanding high-temperature corrosion of iron.",
            reactionType: "Redox"
        },
        {
            name: "Iron as Catalyst",
            equation: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)  [Iron as catalyst]",
            description: "Iron serves as a catalyst in the Haber-Bosch process for ammonia synthesis, one of the most important industrial chemical processes.",
            conditions: ["Iron catalyst (often with promoters)", "High pressure (150-300 atm)", "Moderate temperature (400-500°C)", "Continuous process"],
            applications: "Production of ammonia for fertilizers, nitric acid, explosives, and various nitrogen compounds.",
            reactionType: "Catalysis"
        }
    ],
    
    // Example of a noble gas with known compounds
    // ===== XENON (54) =====
    54: [
        {
            name: "Xenon-Fluorine Reaction",
            equation: "Xe(g) + F₂(g) → XeF₂(s)",
            description: "Xenon reacts with fluorine under controlled conditions to form xenon difluoride, one of the first noble gas compounds discovered (1962).",
            conditions: ["Sunlight or electric discharge", "Room temperature or heated", "Controlled pressure", "1:5 Xe:F₂ ratio optimal"],
            applications: "XeF₂ is used as a fluorinating agent, an etching agent for silicon in semiconductor fabrication, and in chemical synthesis.",
            reactionType: "Synthesis"
        },
        {
            name: "Formation of Higher Xenon Fluorides",
            equation: "Xe(g) + 2F₂(g) → XeF₄(s)\nXe(g) + 3F₂(g) → XeF₆(s)",
            description: "Under more vigorous conditions, xenon forms tetrafluoride and hexafluoride compounds, demonstrating higher oxidation states.",
            conditions: ["Higher temperature and pressure than XeF₂", "Electric discharge", "Excess fluorine", "Special apparatus required"],
            applications: "Powerful oxidizing and fluorinating agents; used in some specialized synthetic chemistry; XeF₆ is used to prepare other xenon compounds.",
            reactionType: "Synthesis"
        },
        {
            name: "Xenon Oxides Formation",
            equation: "XeF₆ + H₂O → XeO₃ + HF",
            description: "Xenon trioxide can be formed by careful hydrolysis of xenon hexafluoride. It is a highly explosive compound.",
            conditions: ["Controlled hydrolysis", "Low temperature", "Highly unstable product", "Explosive"],
            applications: "Primarily of academic interest due to instability; powerful oxidizing agent.",
            reactionType: "Hydrolysis"
        },
        {
            name: "Xenon Oxyfluorides",
            equation: "XeF₄ + H₂O → XeOF₂ + 2HF",
            description: "Xenon forms various oxyfluoride compounds that contain Xe-O and Xe-F bonds.",
            conditions: ["Partial hydrolysis of xenon fluorides", "Controlled conditions", "Specialized equipment"],
            applications: "Research in noble gas chemistry; some potential as oxidizing agents in specialized applications.",
            reactionType: "Controlled hydrolysis"
        },
        {
            name: "Xenon-Oxygen Compounds",
            equation: "XeO₃ + NaOH → Na₄XeO₆ + Xe + O₂ + H₂O",
            description: "Xenon can form various oxoanions in solution, such as perxenate (XeO₆⁴⁻).",
            conditions: ["Basic solution", "Controlled conditions", "Unstable in acidic conditions"],
            applications: "Research in noble gas chemistry; some perxenates have been investigated as oxidizing agents.",
            reactionType: "Complex formation"
        },
        {
            name: "Xenon in Medical Applications",
            equation: "Xe + biological systems → physical interactions",
            description: "Xenon can dissolve in blood and has anesthetic properties. It also forms weak interactions with proteins through van der Waals forces.",
            conditions: ["Physiological conditions", "Physical rather than chemical interaction", "Reversible process"],
            applications: "Xenon is used as an anesthetic gas, in medical imaging (¹²⁹Xe MRI), and in some specialized medical applications.",
            reactionType: "Physical process/weak interaction"
        }
    ],
    
    // Example of a radioactive element
    // ===== URANIUM (92) =====
    92: [
        {
            name: "Uranium Nuclear Fission",
            equation: "²³⁵U + n → fission products + 2-3n + energy",
            description: "Uranium-235 undergoes nuclear fission when it captures a neutron, splitting into lighter elements and releasing energy and more neutrons.",
            conditions: ["Neutron bombardment", "Critical mass necessary for chain reaction", "Controlled in reactors, uncontrolled in weapons", "Releases ~200 MeV per fission"],
            applications: "Nuclear power generation, nuclear weapons, naval propulsion, research applications.",
            reactionType: "Nuclear fission"
        },
        {
            name: "Uranium Oxidation",
            equation: "U(s) + O₂(g) → UO₂(s)\n3UO₂(s) + O₂(g) → U₃O₈(s)",
            description: "Uranium metal is pyrophoric and readily oxidizes in air, initially forming uranium dioxide, which can be further oxidized to U₃O₈.",
            conditions: ["Exothermic reaction", "Powdered uranium can ignite spontaneously", "Multiple oxidation states possible", "Higher oxides form at elevated temperatures"],
            applications: "Understanding uranium chemistry; UO₂ is used as nuclear fuel; U₃O₈ is a stable form for storage.",
            reactionType: "Oxidation"
        },
        {
            name: "Uranium Hexafluoride Formation",
            equation: "U(s) + 3F₂(g) → UF₆(g)",
            description: "Uranium reacts with fluorine to form uranium hexafluoride, a volatile compound used in uranium enrichment processes.",
            conditions: ["Exothermic reaction", "Can be prepared by fluorination of UO₂ or U₃O₈", "Sublimes at 56.5°C", "Highly reactive with water"],
            applications: "Uranium enrichment through gaseous diffusion or centrifugation; critical for both nuclear power and weapons.",
            reactionType: "Fluorination"
        },
        {
            name: "Uranium with Acids",
            equation: "U(s) + 4HNO₃(aq) → UO₂(NO₃)₂(aq) + 2NO₂(g) + 2H₂O(l)",
            description: "Uranium dissolves in nitric acid to form uranyl nitrate, with nitrogen dioxide as a byproduct.",
            conditions: ["Room temperature", "Concentrated acid preferred", "Oxidizing acid required", "Exothermic reaction"],
            applications: "Production of uranium compounds; uranium purification; nuclear fuel processing.",
            reactionType: "Oxidative dissolution"
        },
        {
            name: "Uranium in Nuclear Fuel Cycle",
            equation: "UO₂(s) + 4HF(g) → UF₄(s) + 2H₂O(g)\nUF₄(s) + F₂(g) → UF₆(g)",
            description: "Series of reactions converting uranium oxide to uranium tetrafluoride ('green salt') and then to uranium hexafluoride for enrichment.",
            conditions: ["Multiple step process", "Industrial scale", "Careful control required", "Hazardous chemicals"],
            applications: "Essential steps in nuclear fuel preparation for both power and weapons applications.",
            reactionType: "Multiple conversions"
        },
        {
            name: "Uranium Redox Chemistry",
            equation: "U⁴⁺ + 2H₂O → UO₂²⁺ + 4H⁺ + 2e⁻",
            description: "Uranium exhibits complex redox chemistry, with oxidation states ranging from +3 to +6. The uranyl ion (UO₂²⁺) is the most stable form in aerobic solutions.",
            conditions: ["Aqueous solution", "Multiple oxidation states", "Affected by pH and presence of complexing agents", "Often pH dependent"],
            applications: "Uranium extraction, purification, and separation; nuclear waste processing; environmental chemistry of uranium.",
            reactionType: "Redox"
        }
    ]
};

// Helper functions for reactions

// Get reactions for a specific element
function getElementReactions(atomicNumber) {
    return elementReactionsData[atomicNumber] || [];
}

// Check if element has reactions
function hasReactions(atomicNumber) {
    return elementReactionsData.hasOwnProperty(atomicNumber) && 
           elementReactionsData[atomicNumber].length > 0;
}

// Get reaction types for filtering
function getReactionTypes() {
    const types = new Set();
    
    for (const atomicNumber in elementReactionsData) {
        if (elementReactionsData.hasOwnProperty(atomicNumber)) {
            elementReactionsData[atomicNumber].forEach(reaction => {
                if (reaction.reactionType && reaction.reactionType !== "None") {
                    types.add(reaction.reactionType);
                }
            });
        }
    }
    
    return Array.from(types).sort();
}

// Export the data and helper functions
window.elementReactionsData = elementReactionsData;
window.getElementReactions = getElementReactions;
window.hasReactions = hasReactions;
window.getReactionTypes = getReactionTypes;