document.addEventListener('DOMContentLoaded', function () {
    const selectedAgents = new Set();
    const agentList = document.getElementById('agentList');
    const suggestedAgentEl = document.getElementById('suggestedAgent');

    const teams = [
        { id: 'team1', agents: ['agent1', 'agent2', 'agent3'] },
        { id: 'team2', agents: ['agent4', 'agent5', 'agent6'] },
        { id: 'team3', agents: ['agent1', 'agent4', 'agent5'] },
        // Add more teams here
    ];

    agentList.addEventListener('click', function (event) {
        const agent = event.target.getAttribute('data-agent');
        if (agent) {
            // Toggle agent selection
            if (selectedAgents.has(agent)) {
                selectedAgents.delete(agent);
                event.target.style.backgroundColor = '#f0f0f0';
            } else {
                selectedAgents.add(agent);
                event.target.style.backgroundColor = '#c0c0f0';
            }

            updateTeamHighlights();
            updateSuggestions();
        }
    });

    function updateTeamHighlights() {
        teams.forEach(team => {
            const teamCell = document.querySelector(`[data-team="${team.id}"]`);
            let allAgentsSelected = true;

            team.agents.forEach(agent => {
                const agentElement = document.querySelector(`[data-team="${team.id}"] [data-agent="${agent}"]`);
                
                if (selectedAgents.has(agent)) {
                    agentElement.classList.add('highlight');
                } else {
                    agentElement.classList.remove('highlight');
                    allAgentsSelected = false;
                }
            });

            if (allAgentsSelected) {
                teamCell.classList.add('highlight-complete');
            } else {
                teamCell.classList.remove('highlight-complete');
            }
        });
    }

    function updateSuggestions() {
        const agentCounts = {};

        teams.forEach(team => {
            const missingAgents = team.agents.filter(agent => !selectedAgents.has(agent));
            if (missingAgents.length === 1) {
                const agent = missingAgents[0];
                agentCounts[agent] = (agentCounts[agent] || 0) + 1;
            }
        });

        let bestAgent = null;
        let maxCount = 0;

        for (const [agent, count] of Object.entries(agentCounts)) {
            if (count > maxCount) {
                bestAgent = agent;
                maxCount = count;
            }
        }

        if (bestAgent) {
            suggestedAgentEl.textContent = `Consider obtaining ${bestAgent} to complete ${maxCount} more teams.`;
        } else {
            suggestedAgentEl.textContent = 'No suggestions available.';
        }
    }
});