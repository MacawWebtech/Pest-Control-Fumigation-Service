/**
 * DEFENDRA - PEST CONTROL & FUMIGATION SERVICE
 * Interactive Cost Estimate Calculator (INR ₹ Ranges)
 * Real-time calculation based on pest type, premise type, area sq.ft, and treatment plan frequency
 * Vanilla ES6+, no global pollution, zero console.log
 */

(() => {
  'use strict';

  const initCalculator = () => {
    const calcContainer = document.getElementById('pestCostCalculator');
    if (!calcContainer) return;

    // Elements
    const pestSelect = calcContainer.querySelector('#calcPestType');
    const premiseSelect = calcContainer.querySelector('#calcPremiseType');
    const areaRange = calcContainer.querySelector('#calcAreaRange');
    const areaInput = calcContainer.querySelector('#calcAreaInput');
    const planInputs = calcContainer.querySelectorAll('input[name="calc_plan"]');
    
    // Outputs
    const priceOutput = calcContainer.querySelector('#calcEstimatedTotal');
    const durationOutput = calcContainer.querySelector('#calcDuration');
    const warrantyOutput = calcContainer.querySelector('#calcWarranty');
    const ctaBookBtn = calcContainer.querySelector('#calcBookCta');

    // Base rates per pest type (INR)
    const basePestRates = {
      termites: { base: 2800, perSqft: 1.8, duration: '2.5 - 4.0 Hrs', warranty: '365-Day Guarantee' },
      bed_bugs: { base: 2400, perSqft: 1.5, duration: '2.0 - 3.5 Hrs', warranty: '180-Day Guarantee' },
      cockroaches: { base: 1400, perSqft: 0.9, duration: '1.0 - 2.0 Hrs', warranty: '90-Day Guarantee' },
      rodents: { base: 1800, perSqft: 1.1, duration: '1.5 - 2.5 Hrs', warranty: '90-Day Guarantee' },
      fumigation: { base: 5500, perSqft: 2.5, duration: '4.0 - 8.0 Hrs', warranty: 'Industrial Certificate' },
      general: { base: 1200, perSqft: 0.75, duration: '1.0 - 1.5 Hrs', warranty: '60-Day Guarantee' }
    };

    // Premise Multipliers
    const premiseMultipliers = {
      apartment: 1.0,
      villa: 1.25,
      commercial_office: 1.4,
      restaurant: 1.6,
      warehouse: 1.8
    };

    // Plan Multipliers & Discounts
    const planMultipliers = {
      single: { mult: 1.0, label: 'One-Time' },
      quarterly: { mult: 2.8, label: 'Quarterly (4 visits/yr)' },
      annual: { mult: 4.2, label: 'Annual (6 visits + 365D warranty)' }
    };

    const updateCalculations = () => {
      const pestKey = pestSelect ? pestSelect.value : 'termites';
      const premiseKey = premiseSelect ? premiseSelect.value : 'apartment';
      const area = parseInt(areaRange ? areaRange.value : (areaInput ? areaInput.value : 1200), 10) || 1200;

      let planKey = 'single';
      planInputs.forEach((radio) => {
        if (radio.checked) planKey = radio.value;
      });

      const pestData = basePestRates[pestKey] || basePestRates.termites;
      const premMult = premiseMultipliers[premiseKey] || 1.0;
      const planData = planMultipliers[planKey] || planMultipliers.single;

      // Mathematical computation
      const calculatedBase = pestData.base + (area * pestData.perSqft);
      const scaledPrice = calculatedBase * premMult * planData.mult;

      const minEstimate = Math.round((scaledPrice * 0.92) / 100) * 100;
      const maxEstimate = Math.round((scaledPrice * 1.15) / 100) * 100;

      // Update UI outputs
      if (priceOutput) {
        priceOutput.textContent = `₹${minEstimate.toLocaleString('en-IN')} – ₹${maxEstimate.toLocaleString('en-IN')}*`;
      }

      if (durationOutput) {
        durationOutput.textContent = pestData.duration;
      }

      if (warrantyOutput) {
        warrantyOutput.textContent = planKey === 'annual' ? '365-Day Defendra Shield Guarantee' : pestData.warranty;
      }

      // Update CTA Link with pre-filled parameters
      if (ctaBookBtn) {
        ctaBookBtn.href = `inspection-booking.html?pest=${pestKey}&property=${premiseKey}&size=${area}`;
      }
    };

    // Synchronize Range Slider & Number Input
    if (areaRange && areaInput) {
      areaRange.addEventListener('input', () => {
        areaInput.value = areaRange.value;
        updateCalculations();
      });

      areaInput.addEventListener('input', () => {
        areaRange.value = areaInput.value;
        updateCalculations();
      });
    }

    if (pestSelect) pestSelect.addEventListener('change', updateCalculations);
    if (premiseSelect) premiseSelect.addEventListener('change', updateCalculations);
    planInputs.forEach((radio) => radio.addEventListener('change', updateCalculations));

    // Run initial calculation
    updateCalculations();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
  } else {
    initCalculator();
  }
})();
