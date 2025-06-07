 const gradeBoundaries = [
      { grade: 'S', min: 90 },
      { grade: 'A+', min: 85 },
      { grade: 'A', min: 80 },
      { grade: 'B+', min: 70 },
      { grade: 'B', min: 60 },
      { grade: 'C', min: 50 },
      { grade: 'P', min: 45 },
      { grade: 'F', min: 0 }
    ];

    function calculateTarget() {
      const cie = parseInt(document.getElementById("cie").value);
      const output = document.getElementById("targetResult");

      if (isNaN(cie) || cie < 0 || cie > 40) {
        output.textContent = "Please enter a valid internal mark (0-40).";
        return;
      }

      let result = `<strong>To Pass:</strong> ${cie<21?45-cie:24} marks in ESE<br/><br/>`;
      gradeBoundaries.forEach(b => {
        const needed = b.min - cie;
        if (needed <= 60) {
          result += `${b.grade}: Need ${needed} in ESE<br/>`;
        }
      });

      output.innerHTML = result;
    }

    function assessRisk() {
      const cie = parseInt(document.getElementById("cie").value);
      const output = document.getElementById("riskResult");

      if (isNaN(cie) || cie < 0 || cie > 40) {
        output.textContent = "Please enter a valid internal mark (0-40).";
        return;
      }

      const required = 45 - cie;

      let level = "";
      if (required <= 24) level = '<span class="safe">Safe</span>: Easy to pass';
      else if (required <= 36) level = '<span class="risky">Risky</span>: Needs high marks';
      else level = '<span class="impossible">Impossible</span>: Grade not achievable';

      output.innerHTML = `Risk Level: ${level}`;
    }

    function whatIf() {
      const cie = parseInt(document.getElementById("cie").value);
      const ese = parseInt(document.getElementById("hypotheticalESE").value);
      const output = document.getElementById("whatIfResult");

      if (isNaN(cie) || cie < 0 || cie > 40 || isNaN(ese) || ese < 0 || ese > 60) {
        output.textContent = "Please enter valid marks (CIE: 0-40, ESE: 0-60).";
        return;
      }

      const total = cie + ese;
      let grade = "F";
      for (const b of gradeBoundaries) {
        if (total >= b.min) {
          grade = b.grade;
          break;
        }
      }

      const passCheck = ese >= 24 && total >= 45;
      output.innerHTML = `Total Marks: ${total}<br/>Final Grade: <strong>${passCheck ? grade : "F (Failed)"}</strong>`;
    }
