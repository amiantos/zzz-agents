document.addEventListener('DOMContentLoaded', function () {
    // Define the data model with images
    const agents = [
        { id: 'anby', name: 'Anby', image: 'images/anby.webp' },
        { id: 'anton', name: 'Anton', image: 'images/anton.webp' },
        { id: 'ben', name: 'Ben', image: 'images/ben.webp' },
        { id: 'ellen', name: 'Ellen', image: 'images/ellen.webp' },
        { id: 'grace', name: 'Grace', image: 'images/grace.webp' },
        { id: 'koleda', name: 'Koleda', image: 'images/koleda.webp' },
        { id: 'soldier11', name: 'Soldier 11', image: 'images/soldier-11.webp' },
        { id: 'lucy', name: 'Lucy', image: 'images/lucy.webp' },
        { id: 'lycaon', name: 'Lycaon', image: 'images/lycaon.webp' },
        { id: 'nekomata', name: 'Nekomata', image: 'images/nekomata.webp' },
        { id: 'nicole', name: 'Nicole', image: 'images/nicole.webp' },
        { id: 'piper', name: 'Piper', image: 'images/piper.webp' },
        { id: 'rina', name: 'Rina', image: 'images/rina.webp' },
        { id: 'soukaku', name: 'Soukaku', image: 'images/soukaku.webp' },
        { id: 'zhuyuan', name: 'Zhu Yuan', image: 'images/zhu-yuan.webp' },
        { id: 'billy', name: 'Billy', image: 'images/billy.webp' },
        { id: 'corin', name: 'Corin', image: 'images/corin.webp' },
    ];

    const teams = [
        { id: 'starter', agents: ['anby', 'nicole', 'billy'], element: '', name: 'Starter' },
        { id: 'early', agents: ['anby', 'nicole', 'anton'], element: '', name: 'Early Team' },

        { id: 'shock-stun', agents: ['corin', 'rina', 'anby'], element: '', name: 'Shock and Stun'},
        { id: 'ultimate-assault', agents: ['nekomata', 'nicole', 'piper'], element: '', name: 'Ultimate Assault'},
        { id: 'disorder-team', agents: ['piper', 'grace', 'lucy'], element: '', name: 'Disorder Anomaly'},

        { id: 'cunning-hares-team', agents: ['nekomata', 'anby', 'nicole'], element: '', name: 'Cunning Hares'},
        { id: 'victoria-team', agents: ['ellen', 'rina', 'lycaon'], element: '', name: 'Victoria Housekeeping'},
        { id: 'belobog-team', agents: ['anton', 'koleda', 'ben'], element: '', name: 'Belobog Heavy Industries'},
        { id: 'zhu-yuan-best', agents: ['zhuyuan', 'lycaon', 'rina'], element: '', name: 'Zhu Yuan' },

        { id: 'physical', agents: ['nekomata', 'piper', 'lucy'], element: 'physical', name: 'Physical'},
        { id: 'fire', agents: ['soldier11', 'koleda', 'lucy'], element: 'fire', name: 'Fire'},
        { id: 'mono-fire', agents: ['soldier11', 'ben', 'koleda'], element: 'fire', name: 'Fire 2' },
        { id: 'ice', agents: ['ellen', 'soukaku', 'lycaon'], element: 'ice', name: 'Ice'},
        { id: 'electric', agents: ['anton', 'grace', 'rina'], element: 'electric', name: 'Electric' },
        { id: 'electric2', agents: ['anby', 'grace', 'anton'], element: 'electric', name: 'Electric 2'},
        { id: 'ether', agents: ['zhuyuan', 'anby', 'nicole'], element: 'ether', name: 'Ether' },

    ];
    const selectedAgents = new Set();
    const agentList = document.getElementById('agentList');
    const teamGrid = document.getElementById('teamGrid');
    const suggestedAgentEl = document.getElementById('suggestedAgent');

    // sort agents by agent.name
    agents.sort((a, b) => a.name.localeCompare(b.name));

    // Generate the agent list dynamically as cards
    agents.forEach(agent => {
        const agentCard = document.createElement('li');
        agentCard.className = 'agent-card';
        agentCard.setAttribute('data-agent', agent.id);

        const agentImage = document.createElement('img');
        agentImage.src = agent.image;
        agentImage.alt = agent.name;

        const agentName = document.createElement('div');
        agentName.className = 'agent-name';
        agentName.textContent = agent.name;

        agentCard.appendChild(agentImage);
        agentCard.appendChild(agentName);

        agentList.appendChild(agentCard);

        // Add event listener for selecting/deselecting agents
        agentCard.addEventListener('click', function () {
            if (selectedAgents.has(agent.id)) {
                selectedAgents.delete(agent.id);
                agentCard.classList.remove('agent-card-selected');
            } else {
                selectedAgents.add(agent.id);
                agentCard.classList.add('agent-card-selected');
            }

            updateTeamHighlights();
            updateSuggestions();
            updateURLWithSelectedAgents();
        });
    });

    // Generate the team grid dynamically with images
    teams.forEach(team => {
        const teamCell = document.createElement('div');
        teamCell.className = 'team-cell';
        teamCell.setAttribute('data-team', team.id);
    
        // Add team name and element at the top of the teamCell
        const teamName = document.createElement('div');
        teamName.className = 'team-name';
        teamName.textContent = `${team.name}`;
        teamCell.appendChild(teamName);

        // Sort agents alphabetically by name before generating elements
        const sortedAgents = team.agents.slice().sort((a, b) => {
            const agentA = agents.find(agent => agent.id === a).name.toLowerCase();
            const agentB = agents.find(agent => agent.id === b).name.toLowerCase();
            return agentA.localeCompare(agentB);
        });

        // Generate agent elements within the team cell
        sortedAgents.forEach(agentId => {
            const agentElement = document.createElement('div');
            agentElement.className = 'agent';
            agentElement.setAttribute('data-agent', agentId);
    
            const agentData = agents.find(agent => agent.id === agentId);
    
            if (agentData && agentData.image) {
                const img = document.createElement('img');
                img.src = agentData.image;
                img.alt = agentData.name;
                // img.style.width = '100%';
                img.style.height = '100%';
                agentElement.appendChild(img);
            } else {
                agentElement.textContent = agentData ? agentData.name : 'Unknown';
            }
    
            teamCell.appendChild(agentElement);
        });
    
        teamGrid.appendChild(teamCell);
    });

    // Functionality for URL management, team highlighting, and suggestions remains the same
    loadSelectedAgentsFromURL();

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
                if (!agentCounts[agent]) {
                    agentCounts[agent] = { count: 0, teams: [] };
                }
                agentCounts[agent].count += 1;
                agentCounts[agent].teams.push(team.name);
            }
        });
    
        const sortedAgents = Object.entries(agentCounts)
            .sort((a, b) => b[1].count - a[1].count)
            .map(([agent, data]) => {
                const teamList = data.teams.join(', ');
                return `${agents.find(a => a.id === agent).name} can complete ${data.count} team(s): ${teamList}`;
            });
    
        if (sortedAgents.length > 0) {
            suggestedAgentEl.innerHTML = `<ol>${sortedAgents.map(agent => `<li>${agent}</li>`).join('')}</ol>`;
        } else {
            suggestedAgentEl.textContent = 'No suggestions available.';
        }
    }

    function updateURLWithSelectedAgents() {
        const selectedAgentsArray = Array.from(selectedAgents);
        const agentString = selectedAgentsArray.join(',');
        const encodedAgentString = btoa(agentString);
        const url = new URL(window.location.href);
        url.searchParams.set('agents', encodedAgentString);
        window.history.replaceState({}, '', url);
    }

    function loadSelectedAgentsFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedAgentsFromURL = urlParams.get('agents');
        if (encodedAgentsFromURL) {
            const decodedAgentString = atob(encodedAgentsFromURL);
            const agentsArray = decodedAgentString.split(',');
            agentsArray.forEach(agent => {
                selectedAgents.add(agent);
                const agentCard = document.querySelector(`[data-agent="${agent}"]`);
                if (agentCard) {
                    agentCard.classList.add('agent-card-selected');
                }
            });
            updateTeamHighlights();
            updateSuggestions();
        }
    }
});