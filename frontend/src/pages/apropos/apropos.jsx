const Apropos = () => {
    return (
        <section style={{ backgroundColor: "white", padding: '15px', borderRadius: '15px' }}>
            <h1 style={{ fontSize: '2rem' }}>À propos de nous</h1>
            <h2>Notre entreprise</h2>
            <p>ThéTipTop est une entreprise spécialisée dans la promotion de gammes de thés de très grande qualité avec des mélanges signatures de l’entreprise, des thés détox, des thés blancs, des thés légumes, infusions, etc. L’ensemble de nos thés sont bios et Handmades.</p>
            <p>Nous sommes une société créative et passionnée, avec une forte expertise dans l'art du thé.</p>

            <h2>Notre équipe</h2>
            <ul style={{ listStyle: "none", padding: 0, textAlign: "left", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src="https://images.pexels.com/photos/3831569/pexels-photo-3831569.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Eric Bourdon" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
                    <span>Eric Bourdon - Gérant</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src="https://images.pexels.com/photos/6502999/pexels-photo-6502999.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Alice Dupont" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
                    <span>Alice Dupont - Responsable marketing</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Julien Martin" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
                    <span>Julien Martin - Responsable des ventes</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src="https://images.pexels.com/photos/6584748/pexels-photo-6584748.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Marie Dubois" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
                    <span>Marie Dubois - Responsable de la production</span>
                </li>
            </ul>

            <h2>Nos valeurs</h2>
            <ul style={{ textAlign: "left" }}>
                <li><strong>Qualité</strong> - Nous nous engageons à offrir des thés de la plus haute qualité, avec des mélanges exclusifs et des ingrédients de première qualité.</li>
                <li><strong>Créativité</strong> - Nous sommes constamment à la recherche de nouvelles idées pour créer des thés uniques et innovants.</li>
                <li><strong>Responsabilité</strong> - Nous sommes soucieux de notre impact environnemental et social, et nous travaillons avec des fournisseurs responsables et éthiques.</li>
            </ul>
        </section>
    );
};

export default Apropos;