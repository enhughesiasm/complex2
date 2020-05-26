import WorldState from "../../world_state";

export const initialDelivery_progress = {
	enabled: true,
	id: "IDELIVERY_PROGRESS",
	priority: 10,

	run(worldState: WorldState, delta_sec: number) {
		const {
			worldFlags: flags,
			worldOperations: operations,
			playerAttributes: attributes,
			storage,
		} = worldState;

		if (!flags.isHandDeliveringBatch && !flags.isVolunteerHandDeliveringBatch) {
			// nothing to do here
			return;
		}

		// begin job if necessary; prioritise self-deliveries
		if (
			flags.isHandDeliveringBatch &&
			operations.handDeliverBatchProgress === 0
		) {
			// is there anything to deliver?
			if (storage.initialStorageTraits.length === 0) {
				// no, give up
				flags.isHandDeliveringBatch = false;
				return;
			} else {
				worldState.deliveryManager.handDeliveries = storage.initialStorageTraits.slice(
					0
				);
				storage.initialStorageTraits = [];
			}
		}

		// begin job if necessary; prioritise self-deliveries
		if (
			flags.isVolunteerHandDeliveringBatch &&
			operations.volunteerHandDeliverBatchProgress === 0
		) {
			// is there anything to deliver?
			if (storage.initialStorageTraits.length === 0) {
				// no, give up
				flags.isVolunteerHandDeliveringBatch = false;
				return;
			} else {
				worldState.deliveryManager.volunteerHandDeliveries = storage.initialStorageTraits.slice(
					0
				);
				storage.initialStorageTraits = [];
			}
		}

		// progress jobs
		if (flags.isHandDeliveringBatch) {
			if (worldState.deliveryManager.handDeliveries.length > 0) {
				operations.handDeliverBatchProgress +=
					attributes.handDeliveryProgressPerSecond * delta_sec;
				operations.handDeliverBatchProgress =
					Math.round(operations.handDeliverBatchProgress * 1e3) / 1e3;
			} else {
				console.log("Can't hand deliver empty batch.");
				flags.isHandDeliveringBatch = false;
			}
		}

		// progress volunteer delivery
		if (flags.isVolunteerHandDeliveringBatch) {
			if (worldState.deliveryManager.volunteerHandDeliveries.length > 0) {
				operations.volunteerHandDeliverBatchProgress +=
					attributes.handDeliveryProgressPerSecond * delta_sec;
				operations.volunteerHandDeliverBatchProgress =
					Math.round(operations.volunteerHandDeliverBatchProgress * 1e3) / 1e3;
			} else {
				console.log("Can't volunteer hand deliver empty batch.");
				flags.isVolunteerHandDeliveringBatch = false;
			}
		}
	},
};

export const initialDelivery_complete = {
	enabled: true,
	id: "IDELIVERY_COMPLETE",

	priority: 15,

	run(worldState: WorldState, delta_sec: number) {
		const { worldFlags: flags, worldOperations: operations } = worldState;

		while (operations.handDeliverBatchProgress >= 100) {
			// on completion, we deliver everything in the handtraits, which should be a limited storage
			const traits = worldState.deliveryManager.handDeliveries;
			traits.forEach((t) => {
				worldState.shop.receiveTraitsAtLevelNumber(t.rarity, 1);
				worldState.favours += worldState.shop.getTraitPayment(t.rarity, 1);
			});
			worldState.deliveryManager.handDeliveries = [];
			flags.isHandDeliveringBatch = false;
			operations.handDeliverBatchProgress = 0;
			flags.handDeliveredFirstBatch = true;
		}

		while (operations.volunteerHandDeliverBatchProgress >= 100) {
			// on completion, we deliver everything in the handtraits, which should be a limited storage
			const traits = worldState.deliveryManager.volunteerHandDeliveries;
			traits.forEach((t) => {
				worldState.shop.receiveTraitsAtLevelNumber(t.rarity, 1);
				worldState.favours += worldState.shop.getTraitPayment(t.rarity, 1);
			});
			worldState.deliveryManager.volunteerHandDeliveries = [];
			flags.isVolunteerHandDeliveringBatch = false;
			operations.volunteerHandDeliverBatchProgress = 0;
		}
	},
};
