function renderTeam(containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container "${containerId}" not found.`);
        return;
    }

    if (typeof clubMembers === "undefined") {
        console.error("clubMembers array not found.");
        return;
    }

    // Group members by Batch -> Sector
    const grouped = {};

    clubMembers.forEach(member => {
        const batch = `Batch ${member.batch}`;
        const sector = member.sector || "General";

        if (!grouped[batch]) grouped[batch] = {};
        if (!grouped[batch][sector]) grouped[batch][sector] = [];

        grouped[batch][sector].push(member);
    });

    // Order in which sectors should appear
    const sectorOrder = [
        "Trading",
        "Analytics",
        "Finance",
        "Management",
        "PR and Social Media",
        "General"
    ];

    let html = '<div class="batches-wrapper">';

    Object.keys(grouped).sort().forEach(batch => {

        html += `
            <div class="batch-column">
                <h2 class="batch-heading">${batch}</h2>
        `;

        sectorOrder.forEach(sector => {

            if (!grouped[batch][sector]) return;

            html += `
                <div class="sector-group">
                    <h3 class="sector-heading">${sector}</h3>

                    <div class="team__grid">
            `;

            grouped[batch][sector].forEach(member => {

                const roleHTML =
                    member.role && member.role !== "Member"
                        ? `<span class="member-role">${member.role}</span>`
                        : "";

                html += `
                    <div class="team__card">
                        ${roleHTML}
                        <div class="member-name">${member.name}</div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += `</div>`;
    });

    html += `</div>`;

    container.innerHTML = html;
}