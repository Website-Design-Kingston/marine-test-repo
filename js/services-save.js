var MainService = (function () {
  var currentItemIndex, currentJournalIndex;
  var journalDatas = [{
    itemCodes: [{
        itemCode: 11,
        itemName: "Bowsprit",
        itemDetail: "A bowsprit is a spar that juts out in front of the ship to hold the forward triangular-shaped sails, called the foresails. ",
        shipDetail: "The George Marsh is one of the few shipwrecks near Kingston that is in such good condition, including an intact bowsprit.",
        conditionsDetail: "A thick rope covered in algae extends from the tip of the bowsprit to the hull of the ship.",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A01_bowsprit_MarkedUp_Image.jpg",
          text: "Bowsprit",
          textPosition: "top: 0; left: 32%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/STEP03_Bowsprit_image_rollover.png'
      },
      {
        itemCode: 12,
        itemName: "Anchor",
        itemDetail: "The anchor is a very heavy piece of iron, held by a chain, that secured the ship in once place while in open water.",
        shipDetail: "During the the storm that sunk the Marsh, the anchor would have been raised.",
        conditionsDetail: "The anchor sits partially buried in the sediment",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A01_anchor_MarkedUp_Image.jpg",
          text: "Anchor",
          textPosition: "top: 55%; left: 70%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Anchor_image_rollover.png'
      },
      {
        itemCode: 22,
        itemName: "Donkey Engine Boiler",
        itemDetail: "This is the boiler, which was used for heating water to create steam that powered small engines like the donkey engine.",
        shipDetail: "<p>The George Marsh was a ship of sail during the era of steam ships.</p><p>Steam engine technology was used on deck to help make work easier and crews smaller.</p>",
        conditionsDetail: "The boiler has been moved on this wreck – it would have normally been placed in the middle of the ship",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A02_Boiler_MarkedUp_Image.jpg",
          text: 'Boiler',
          textPosition: 'top: 14%; left: 23%;'
        },
        itemImageAttachment: "img/wreck-diver/items/STEP05_Boiler_image_rollover.png"
      },
      {
        itemCode: 101,
        itemName: "Boiler",
        itemDetail: "This is the boiler, which was used for heating water to create steam that powered small engines like the donkey engine.",
        shipDetail: "The George Marsh was a ship of sail during the era of steam ships. Steam engine technology was used on deck to help make work easier and crews smaller.",
        conditionsDetail: "Boiler still upright and mostly intact",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B03_Boiler_MarkedUp_Image.jpg",
          text: "Boiler",
          textPosition: "top: 0; left: 57%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/STEP05_Boiler_image_rollover.png'
      },
      {
        itemCode: 21,
        itemName: "A Yard",
        itemDetail: "A yard arm is a hefty timber that is attached horizontally to a mast and to the bottom of each main sail.",
        shipDetail: "Yards were attached to the three masts of the George Marsh, to secure its sails.",
        conditionsDetail: "Blocks on yard in good condition",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A02_yard_MarkedUp_Image.jpg",
          text: 'Yard',
          textPosition: 'top: 14%; left: 23%;'
        },
        itemImageAttachment: 'img/wreck-diver/items/Yard_img_rollover.png'
      },
      {
        itemCode: 93,
        itemName: "Yard",
        itemDetail: "A yard arm is a hefty timber that is attached horizontally to a mast and to the bottom of each main sail.",
        shipDetail: "Yards were attached to the three masts of the George Marsh, to secure its sails.",
        conditionsDetail: "Yard is partially coated in mussels and algae",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B02_yard_MarkedUp_Image.jpg",
          text: "Yard",
          textPosition: "top: -2%; left: 6%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Yard_img_rollover.png'
      },
      {
        itemCode: 114,
        itemName: "Yard",
        itemDetail: "A yard arm is a hefty timber that is attached horizontally to a mast and to the bottom of each main sail.",
        shipDetail: "Yards were attached to the three masts of the George Marsh, to secure its sails.",
        conditionsDetail: "Yard is partially coated in mussels and algae",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B04_yard_MarkedUp_Image.jpg",
          text: "Yard",
          textPosition: "top: 4%; left: 53%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Yard_img_rollover.png'
      },
      {
        itemCode: 24,
        itemName: "Mast Timber",
        itemDetail: "This is one of three masts of the George Marsh. The masts carried the sails and all the rigging.",
        shipDetail: "When the George Marsh sank in 100 feet of water, its masts were still standing straight up and reached close to the surface. To avoid hazards to other ships, the masts were pulled up and dropped onto the deck.",
        conditionsDetail: "The masts are in remarkably good condition",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A02_mast_timber_MarkedUp_Image.jpg",
          text: "Mast Timber",
          textPosition: "top: 14%; left: 23%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Mast-Timber_img_rollover.png'
      },
      {
        itemCode: 113,
        itemName: "Mast Timber",
        itemDetail: "This is one of three masts of the George Marsh. The masts carried the sails and all the rigging.",
        shipDetail: "When the George Marsh sank in 100 feet of water, its masts were still standing straight up and reached close to the surface. To avoid hazards to other ships, the masts were pulled up and dropped onto the deck.",
        conditionsDetail: "Remarkably good condition",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B04_mast_timber_MarkedUp_Image.jpg",
          text: "Mast Timber",
          textPosition: "top: 6%; left: 30%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Mast-Timber_img_rollover.png'
      },
      {
        itemCode: 23,
        itemName: "Windlass",
        itemDetail: "Another critical device for handling the ropes! The windlass is a rotating drum that helps sailors pull ropes. It was often used with a steam engine or a manual two-person crank.",
        shipDetail: "Like much of the wreck, this interesting piece is covered with zebra mussels.",
        conditionsDetail: "Covered in zebra mussels",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A02_windlass_MarkedUp_Image.jpg",
          text: "Windlass",
          textPosition: "top: 14%; left: 23%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/windlass_img_rollover.png'
      },
      {
        itemCode: 121,
        itemName: "Windlass",
        itemDetail: "Another critical device for handling the ropes! The windlass is a rotating drum that helps sailors pull ropes. It was often used with a steam engine or a manual two-person crank.",
        shipDetail: "Like much of the wreck, this interesting piece is covered with zebra mussels.",
        conditionsDetail: "Covered in zebra mussels",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B05_windlass_MarkedUp_Image.jpg",
          text: "Windlass",
          textPosition: "top: 0%; left: 70%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/windlass_img_rollover.png'
      },
      {
        itemCode: 32,
        itemName: "Pin rail",
        itemDetail: "A pin rail holds the belaying pins used by the crew to secure lines to the sails",
        shipDetail: "There would have been four to six pin rails on the George Marsh.",
        conditionsDetail: "The holes in this pin rail are still visible",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A03_pin rail_MarkedUp_Image.jpg",
          text: "Pin rail",
          textPosition: "top: 14%; left: 23%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Pin-Rail_img_rollover.png'
      },
      {
        itemCode: 41,
        itemName: "Pin rail",
        itemDetail: "A pin rail holds the belaying pins used by the crew to secure lines to the sails.  Pulling a pin was a way to quickly release a line without undoing a knot.",
        shipDetail: "There would have been four to six pin rails on the George Marsh.",
        conditionsDetail: "Holes for belaying pins are clearly visible in this well-preserved pin rail",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A04_pin rail_MarkedUp_Image.jpg",
          text: "Pin rail",
          textPosition: "top: 10%; left: 13%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Pin-Rail_img_rollover.png'
      },
      {
        itemCode: 31,
        itemName: "Double block",
        itemDetail: "A double block contains two grooved wheels, called sheaves, which serve to reduce the amount of force needed in a block and tackle system. ",
        shipDetail: "Blocks and tackles were used throughout the rigging of the George Marsh, and can be seen scattered around the deck on the wreck.",
        conditionsDetail: "Good condition",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A03_double_block_MarkedUp_Image.jpg",
          text: "Double block",
          textPosition: "top: 14%; left: 23%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Double_img_rollover.png'
      },
      {
        itemCode: 72,
        itemName: "Double block",
        itemDetail: "A double block contains two grooved wheels, called sheaves, which serve to reduce the amount of force needed in a block and tackle system. ",
        shipDetail: "Blocks and tackles were used throughout the rigging of the George Marsh, and can be seen scattered around the deck on the wreck.",
        conditionsDetail: "Good condition",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A07_double_block_MarkedUp_Image.jpg",
          text: "Double block",
          textPosition: "top: 60%; left: 5%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Double_img_rollover.png'
      },
      {
        itemCode: 112,
        itemName: "Double block",
        itemDetail: "A double block contains two grooved wheels, called sheaves, which serve to reduce the amount of force needed in a block and tackle system. ",
        shipDetail: "Blocks and tackles were used throughout the rigging of the George Marsh, and can be seen scattered around the deck on the wreck.",
        conditionsDetail: "Good condition",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B04_double_block_MarkedUp_Image.jpg",
          text: "Double block",
          textPosition: "top: 60%; left: 5%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Double_img_rollover.png'
      },
      {
        itemCode: 33,
        itemName: "Mast collar",
        itemDetail: "You can see a few mast collars on the deck of the George A. Marsh. They are metal hoops, used to clamp a boom to a mast or blocks to a yardarm.",
        shipDetail: "The pin in the mast collar allows the boom to swivel, so that sails can be moved to manoeuvre the ship.",
        conditionsDetail: "The details of the mast collar are obscured by algae and mussels.",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A03_mast_collar_MarkedUp_Image.jpg",
          text: "Mast collar",
          textPosition: "top: 5%; left: 70%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Mast-Collar_img_rollover.png'
      },
      {
        itemCode: 42,
        itemName: "Capstan",
        itemDetail: "The capstan is labour-saving winch used for winding ropes.  Sailors use the horizontal bars to turn the capstan in unison.",
        shipDetail: "The crew of the George Marsh would have used the capstan for hoisting sail and moving cargo into the hull through the hatches.",
        conditionsDetail: "The capstan has been heavily colonized by zebra mussels",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A04-Capstan-Image.jpg",
          text: "Capstan",
          textPosition: "top: 14%; left: 23%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Capstan__img_rollover.png'
      },
      {
        itemCode: 102,
        itemName: "Capstan",
        itemDetail: "The capstan is labour-saving winch used for winding ropes.  Sailors use the horizontal bars to turn the capstan in unison.",
        shipDetail: "The crew of the George Marsh would have used the capstan for hoisting sail and moving cargo into the hull through the hatches.",
        conditionsDetail: "The capstan has been heavily colonized by zebra mussels",
        pointPosition: "top: 42%; left: 10%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B03-Capstan-Image.jpg",
          text: "Capstan",
          textPosition: "top: 14%; left: 23%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Capstan__img_rollover.png'
      },
      {
        itemCode: 43,
        itemName: "The hatch",
        itemDetail: "The hatch is the opening in the deck into the cargo hold below.",
        shipDetail: "The George Marsh was carrying a load of coal in its hull when it sank.  That coal is still there, under the silt.",
        conditionsDetail: "The hatch itself is in good condition, though the inside of the hull has been filled with silt and debris",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A04-Cargo-Hatch-Image.jpg",
          text: "Hatch",
          textPosition: "top: 14%; left: 23%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/cargo_hatch_img_rollover.png'
      },
      {
        itemCode: 91,
        itemName: "Hatch",
        itemDetail: "The hatch is the opening in the deck into the cargo hold below. ",
        shipDetail: "The George Marsh was carrying a load of coal in its hull when it sank.  That coal is still there, under the silt.",
        conditionsDetail: "Hatch structure still clearly intact",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B02-Cargo-Hatch-Image.jpg",
          text: "Hatch",
          textPosition: "top: 22%; left: 47%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/cargo_hatch_img_rollover.png'
      },
      {
        itemCode: 52,
        itemName: "Bilge Pump",
        itemDetail: "The bilge pump in a mechanical machine that removes water from the bottom of the hull, called the bilge.",
        shipDetail: "During the storm that sank the George Marsh, the bilge pump would have been working non-stop to remove the water entering the ship. The pump was likely overwhelmed.",
        conditionsDetail: "Possible piece of a bilge pump",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A05-Bilge-Pump-Image.jpg",
          text: "Bilge Pump",
          textPosition: "top: 15%; left: 60%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/bilge__img_rollover.png'
      },
      {
        itemCode: 51,
        itemName: "Clamps",
        itemDetail: "Clamps like these were used to hold down the tarps that covered the hatches.",
        shipDetail: "During rough weather, like the storm that sank the George Marsh, the crew would “batten down the hatches” with tarps and clamps.",
        conditionsDetail: "The threading on this large clamp is still visible",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A05-Clamp-Image.jpg",
          text: "Clamps",
          textPosition: "top: 14%; left: 23%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Clamp_img_rollover.png'
      },
      {
        itemCode: 61,
        itemName: "Clamps",
        itemDetail: "Clamps like these were used to hold down the tarps that covered the hatches.",
        shipDetail: "During rough weather, like the storm that sank the George Marsh, the crew would “batten down the hatches” with tarps and clamps.",
        conditionsDetail: "Good condition",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A06-Clamp-Image.jpg",
          text: "Clamps",
          textPosition: "top: 2%; left: 15%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Clamp_img_rollover.png'
      },
      {
        itemCode: 62,
        itemName: "Steering Gear Housing",
        itemDetail: "A steering house protects the mechanism that connects the ship’s wheel to its rudder.",
        shipDetail: "Lorem ipsum&hellip;",
        conditionsDetail: "Lorem ipsum&hellip;",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A06-Steering-Gear-Housing-Image.jpg",
          text: "Steering Housing",
          textPosition: "top: 5%; left: 48%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Steering-Gear-Housing-image_rollover.png'
      },
      {
        itemCode: 63,
        itemName: "A parrel strap",
        itemDetail: "An interesting find! Parrel straps are used to loosely secure horizontal yards (beams) to the vertical masts.  They are loose so the yards can be freely raised and lowered on the mast. ",
        shipDetail: "Parrel straps like this one were often made of hide threaded with round, wooden beads.",
        conditionsDetail: "Good condition",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A06-Parrel-Strap-Image.jpg",
          text: "A parrel strap",
          textPosition: "top: 15%; left: 5%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Parrel-Strap_img_rollover.png'
      },
      {
        itemCode: 64,
        itemName: "Single sheave block",
        itemDetail: "A block has one or more grooved wheels, called sheaves, designed to hold rope. Sheave blocks are used in block and tackle systems.",
        shipDetail: "Blocks and tackles were used throughout the rigging of the George Marsh, and can be seen scattered around the deck on the wreck.",
        conditionsDetail: "Zebra mussels are preferentially attached to the metal wheels on these blocks",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A06-Sheave-Block-Image.jpg",
          text: "Single sheave block",
          textPosition: "top: 0; left: 60%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Sheave-Block_img_rollover.png'
      },
      {
        itemCode: 71,
        itemName: "Ship’s wheel",
        itemDetail: "You have found the artefact that makes the George A. Marsh such an incredible wreck. Not many wrecks still have their ship’s wheel intact. A ship’s wheel turns the rudder, which steers the ship.",
        shipDetail: "The wheel on sailing vessels like the George Marsh were large to make steering easier.",
        conditionsDetail: "The ship’s wheel has been propped here to be clearly visible to divers",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A07-Ships-Wheel-Image.jpg",
          text: "Ship’s wheel",
          textPosition: "top: 7%; left: 2%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Ships-Wheel_img_rollover.png'
      },
      {
        itemCode: 73,
        itemName: "Deadeye",
        itemDetail: "It may sound like the name of a pirate, but a deadeye is a round wooden block of wood that is part of the ship’s rigging.",
        shipDetail: "As you explore, look for deadeyes still fastened along the port and starboard rails that held the rope shrouds fastened to the masts.",
        conditionsDetail: "The holes in this deadeye have been worn down where ropes were run through",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/A07-DeadeyeImage.jpg",
          text: "Deadeye",
          textPosition: "top: 30%; left: 10%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Dead-Ey-Turnde-in-shroud_img_rollover.png'
      },
      {
        itemCode: 81,
        itemName: "Davits",
        itemDetail: "Davits are small crane-like posts that sailors use to raise and lower heavy lifeboats with pulleys.",
        shipDetail: "The lifeboat that was suspended here saved the lives of two men when the George Marsh sank.",
        conditionsDetail: "Davit covered in zebra mussels",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B01-Davits-image.jpg",
          text: "Davits",
          textPosition: "top: 10%; left: 65%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Davits_img_rollover.png'
      },
      {
        itemCode: 92,
        itemName: "Mooring bitt",
        itemDetail: "They look like fancy railings, but these hefty blocks of wood are mooring bitts. Ropes wound around these blocks secure the ship to a dock.",
        shipDetail: "The large mooring bitt at the centre of the foredeck is called a Samson post.",
        conditionsDetail: "Mooring bitt still in good condition, though covered in zebra mussels",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B02-Mooring-Bitt-image.jpg",
          text: "Mooring bitt",
          textPosition: "top: 14%; left: 23%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Mooring-Bit_img_rollover.png'
      },
      {
        itemCode: 111,
        itemName: "Mooring bitt",
        itemDetail: "They look like fancy railings, but these hefty blocks of wood are mooring bitts. Ropes wound around these blocks secure the ship to a dock. ",
        shipDetail: "The large mooring bitt at the centre of the foredeck is called a Samson post.",
        conditionsDetail: "Mooring bitt still in good condition, though covered in zebra mussels",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B02-Mooring-Bitt-image.jpg",
          text: "Mooring bitt",
          textPosition: "top: 14%; left: 45%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Mooring-Bit_img_rollover.png'
      },
      {
        itemCode: 132,
        itemName: "Mast partners",
        itemDetail: "This may look like a small hatch, but it is a reinforced structure where the mast passes through the deck.",
        shipDetail: "A ship’s masts sit on a footing at the bottom of the hull. They are kept secure with rigging called shrouds.",
        conditionsDetail: "Good condition",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B06-mast-partner-image.jpg",
          text: "Mast partners",
          textPosition: "top: 70%; left: 0%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Mast-Partners_img_rollover.png'
      },
      {
        itemCode: 131,
        itemName: "Winch",
        itemDetail: "A winch consists of a handle attached to a rotating drum around which rope is wound.",
        shipDetail: "Lorem Ipsum&hellip;",
        conditionsDetail: "Lorem Ipsum&hellip;",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "",
          text: "Winch",
          textPosition: "top: 70%; left: 0%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Winch_img_rollover.png'
      },
      {
        itemCode: 133,
        itemName: "Donkey engine",
        itemDetail: "A fine piece of equipment! A donkey engine is a steam-powered winch, used to help lift heavy cargo or help pull a rope through the windlass.",
        shipDetail: "A donkey engine is one of the pieces of steam-powered equipment on board the George Marsh that the boiler powered.",
        conditionsDetail: "Possible donkey engine, covered in mussels and algae",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B06-donkey-engine-image.jpg",
          text: "Donkey engine",
          textPosition: "top: -1%; left: 60%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Donkey-Engine_img_rollover.png'
      },
      {
        itemCode: 141,
        itemName: "Cathead",
        itemDetail: "The cathead is a wooden beam extending out from the bow of the ship, used to support the anchor.",
        shipDetail: "The anchor of the George Marsh was suspended from this cathead as the ship tried to make its way through the storm that sank it.",
        conditionsDetail: "Good condition; anchor visible below. ",
        pointPosition: "top: 44%; left: 12%",
        itemImage: {
          src: "img/wreck-diver/items/journal/B07-Cathead-image.jpg",
          text: "Cathead",
          textPosition: "top: 3%; left: 70%;"
        },
        itemImageAttachment: 'img/wreck-diver/items/Cathead_img_rollover.png'
      }
    ]
  }];

  return {
    journalDatas: journalDatas,
    initAudio: initAudio,
    stopAudio: stopAudio,
    startAudio: startAudio,
    activeJournal: activeJournal,
    bindDatasToJournalByItem: bindDatasToJournalByItem,
    resetStyleByJournal: resetStyleByJournal
  };

  function initAudio() {
    var player = '#music-player';
    var options = {
      ready: function () {
        $(this).jPlayer('setMedia', {
          title: '',
          mp3: './figures/audios/audio.mp3'
        });
      },
      swfPath: '../vendors/jplayer',
      supplied: 'mp3',
      cssSelectorAncestor: '#music-player-container',
      wmode: 'window',
      loop: true
    };
    $(player).jPlayer(options);
  }

  function stopAudio() {
    $('#music-player-container').find('.jp-pause').trigger('click');
  }

  function startAudio() {
    setTimeout(function () {
      $('#music-player-container').find('.jp-play').trigger('click');
    }, 1000);
  }

  function activeJournal() {
    $('.journal').addClass('active');
    var dive1ItemsDiscoveredElement = $('.bag > div[discover=true]');
    dive1ItemsDiscoveredElement.append('<img class="bag__item--image" src="img/wreck-diver/discovered_object_tick.png" />');
    dive1ItemsDiscoveredElement.css('cursor', 'pointer');
    dive1ItemsDiscoveredElement.css('z-index', 1);
    dive1ItemsDiscoveredElement.on('click', function (event) {
      if (!$('.journal').hasClass('active')) return;
      $('.book').css('background', 'transparent');
      $('.left-page, .right-page, .attachment-image').css('display', 'flex');
      bindDatasToJournalByItem($(this).data().item);
      restyleItemByJournal($(this));
      /*       $('.journal .paging > span').on('click', function (event) {
                var journal;
                if ($(event.target).hasClass('paging__next')) {
                  currentJournalIndex = currentJournalIndex + 1;
                  journal = getJournal();
                  if (!journal) {
                    currentJournalIndex = 0;
                  }
                } else {
                  currentJournalIndex = currentJournalIndex - 1;
                  journal = getJournal();
                  if (!journal) {currentJournalIndex = journalDatas[currentItemIndex].itemCodes.length - 1;
                    
                  }
                }
              }),
              journal = getJournal();
            journalHtmlBinding(journal);
          } */
    });
  }

  function bindDatasToJournalByItem(itemCode) {
    journalDatas.forEach(function (journalData, ind) {
      if (!journalData.itemCodes.length) return;
      journalData.itemCodes.forEach(function (journalItem, index) {
        if (journalItem.itemCode !== parseInt(itemCode)) return;
        currentItemIndex = ind;
        currentJournalIndex = index;
      });
      var journal = getJournal();
      if (!journal) return;
      journalHtmlBinding(journal);
    });
  }

  function journalHtmlBinding(journal) {
    $('.attachment-image--src', '.journal').css('background-image', 'url(' + journal.itemImageAttachment + ')');
    $('.item-detail-label', '.journal').html(journal.itemName);
    $('.item-detail-text', '.journal').html(journal.itemDetail);
    $('.ship-detail-text', '.journal').html(journal.shipDetail);
    $('.item-name', '.journal').html(journal.itemName);
    $('.item-image', '.journal').css('background-image', 'url(' + journal.itemImage.src + ')');
    $('.item-image__text', '.journal').attr('style', journal.itemImage.textPosition).text(journal.itemImage.text);
    $('.conditions-text', '.journal').html(journal.conditionsDetail);
    $('.location-point', '.journal').attr('style', journal.pointPosition);
  }

  function restyleItemByJournal(collectionElement) {
    $('img', collectionElement).css('-webkit-filter', 'invert(60%) sepia(1) contrast(2)');
    $('img', collectionElement).css('filter', 'invert(60%) sepia(1) contrast(2)');
    $('.bag__item--image', collectionElement).css('-webkit-filter', 'brightness(1) hue-rotate(234deg) saturate(2)');
    $('.bag__item--image', collectionElement).css('filter', 'brightness(1) hue-rotate(234deg) saturate(2)');
  }

  function resetStyleByJournal() {
    var itemsDiscoveredElement = $('.bag > div[discover=true]');
    itemsDiscoveredElement.css('cursor', 'normal');
    itemsDiscoveredElement.css('z-index', 'auto');
    $('img', itemsDiscoveredElement).css('-webkit-filter', 'invert(100%)');
    $('img', itemsDiscoveredElement).css('filter', 'invert(100%)');
    $('.bag__item--image', itemsDiscoveredElement).remove();
  }

  function getJournal() {
    return journalDatas[currentItemIndex].itemCodes[currentJournalIndex];
  }
})();