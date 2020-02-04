/* ---------- Dynamically Created Content on Page Load ---------*/

//Function to dynamically create the list of races and give each button a unique ID
function populateRaceList(listRaces) {
    listRaces.forEach(element => {
        $(`#race_list`).append(`<li><button type="button" class="btn btn_race btn-primary" id="${element.url}">${element.name}</button></li>`)
    })
}

fetchRaceList()

//Function to dynamically create the list of classes and give each button a unique ID
function populateClassList(listClasses) {
    listClasses.forEach(element => {
        $(`#class_list`).append(`<li><button type="button" class="btn btn_class btn-primary" id="${element.url}">${element.name}</button></li>`)
    });
}

fetchClassList()

//Function to dynamically create the list of skills
function populateSkillList(listSkills) {
    listSkills.forEach(element => {
        $(`#skill_list`).append(`<li>${element.name}</li>`)
    });
}

fetchSkillList()

/* ---------- Race Logic ---------- */

let base_ability = [8, 8, 8, 8, 8, 8,];
let character_ability = base_ability;
let characterLanguages = {};
let characterTraits = {};
let characterProficiencies = {};
let characterSaves = {};

function printBaseStats() {
    $(`.ability_str`).text(base_ability[0]);
    $(`.ability_dex`).text(base_ability[1]);
    $(`.ability_con`).text(base_ability[2]);
    $(`.ability_int`).text(base_ability[3]);
    $(`.ability_wis`).text(base_ability[4]);
    $(`.ability_cha`).text(base_ability[5]);
    $('.ability_bonus').empty();
}

printBaseStats()

function currentRaceInformation(currentRace) {

    currentRace.ability_bonuses.forEach(element => {
        if (element.name === `STR`) {
            character_ability[0] = element.bonus + base_ability[0];
            $(`.ability_str`).text(character_ability[0]);
        } else if (element.name === `DEX`) {
            character_ability[1] = element.bonus + base_ability[1];
            $(`.ability_dex`).text(character_ability[1]);
        } else if (element.name === `CON`) {
            character_ability[2] = element.bonus + base_ability[2];
            $(`.ability_con`).text(character_ability[2]);
        } else if (element.name === `INT`) {
            character_ability[3] = element.bonus + base_ability[3];
            $(`.ability_int`).text(character_ability[3]);
        } else if (element.name === `WIS`) {
            character_ability[4] = element.bonus + base_ability[4];
            $(`.ability_wis`).text(character_ability[4]);
        } else if (element.name === `CHA`) {
            character_ability[5] = element.bonus + base_ability[5];
            $(`.ability_cha`).text(character_ability[5]);
        }
    });

    if (currentRace.ability_bonus_options === undefined) {
        $(`.ability_bonus`).text("0");
    } else {
        $(`.ability_bonus`).text(currentRace.ability_bonus_options.choose);
    }

    $('#race_info_container_left').append('<div class="general_info_styling" id="race_info_left"></div>');
    $('#race_info_container_right').append('<div class="general_info_styling" id="race_info_right"></div>');

    $('#race_info_left').append(`<div class="race_info" id"race_${currentRace.name}_container>
    <h4>${currentRace.name}</h4></div>`);

    $('#race_info_left').append(`<div class="race_info" id"race_${currentRace.alignment}_container>
    <h6>Alignment</h6>
    <p>${currentRace.alignment}</p></div>`);

    $('#race_info_left').append(`<div class="race_info" id"race_${currentRace.age}_container>
    <h6>Age</h6>
    <p>${currentRace.age}</p></div>`);

    $('#race_info_left').append(`<div class="race_info" id"race_${currentRace.size_description}_container>
    <h6>Size</h6>
    <p>${currentRace.size_description}</p></div>`);

    $('#race_info_left').append(`<div class="race_info" id"race_${currentRace.language_desc}_container>
    <h6>Languages</h6>
    <p>${currentRace.language_desc}</p></div>`);


    // Object.keys(currentRace).forEach(element => {
    //     //This looks through the array, and if the current element key is part of the array it runs "return". This is to only get the correct div's created.
    //     if (["_id", "index", "name", "ability_bonuses", "ability_bonus_options", "starting_proficiencies", "starting_proficiency_options", "size", "languages", "language_options", "traits", "trait_options", "subraces", "url"].indexOf(element) >= 0) {
    //         return;
    //     }
    //     $('#race_info_left').append(`<div class="race_info" id="race_${element}_container">
    //         <p id="race_${element}">${currentRace[element]}</p></div>`);
    // });

    $('#race_info_right').append(`<div class="race_info" id="race_languages"><h6>Languages:</h6><div>`)
    currentRace.languages.forEach(element => {
        if (characterLanguages[`race_languages_0`] === undefined) {
            characterLanguages[`race_languages_0`] = {}
        }
        characterLanguages[`race_languages_0`][element.name] = element.name;
        $('#race_languages').append(`<div class="race_list">${element.name}<div>`)
    });

    if (currentRace.language_options !== undefined) {
        if (currentRace.language_options.choose > 1) {

            $('#race_languages').append(`<div class="race_info_container_right" id="race_languages">
            <p>You can choose ${currentRace.language_options.choose} languages from this list</div>`)

            currentRace.language_options.from.forEach(element => {
                $('#race_languages').append(`<div class="race_info race_list">
            <input type="checkbox" class="race_language" value="${element.name}"><span> ${element.name}</span></div>`);
            });

            $('.race_language').on('change', function () {
                if ($(`.race_language:checked`).length > currentRace.language_options.choose) {
                    this.checked = false;
                } else {
                    if (this.checked === true) {
                        if (characterLanguages[`race_languages_1`] === undefined) {
                            characterLanguages[`race_languages_1`] = {}
                        }
                        characterLanguages[`race_languages_1`][this.value] = [this.value];
                    } else {
                        delete characterLanguages[`race_languages_1`][this.value];
                    }
                    console.log(characterLanguages);
                }
            })
        } else {
            $('#race_languages').append(`<div class="race_info race_list" id="race_languages">
            <p>You can choose ${currentRace.language_options.choose} language from this list</p>
            <div><select id="race_languages_list"></select></div>
            </div>`)

            currentRace.language_options.from.forEach(element => {
                $('#race_languages_list').append(`<option value="${element.name}">${element.name}</option>)`)
                console.log(element.name)
            });

            $('#race_languages_list').on('change', function () {
                characterLanguages[`race_languages_1`] = {};
                characterLanguages[`race_languages_1`][$('#race_languages_list').children("option:selected").val()] = $('#race_languages_list').children("option:selected").val()
                console.log(characterLanguages)
            });
        }
    }

    if (currentRace.starting_proficiencies.length > 0) {
        $(`#race_info_right`).append(`<div class="race_info" id="race_proficiencies"><h6>Race Proficencies:</h6></div>`);
        currentRace.starting_proficiencies.forEach(element => {
            $(`#race_proficiencies`).append(`<div class="race_list" id="race_${element.name}_proficency">
             <p id="race_proficency_${element.name}">${element.name}</p></div>`);
            characterProficiencies[`race_proficiencies_0`][element.name] = element.name;
        });
    }

    if (currentRace.starting_proficiency_options !== undefined) {
        if (currentRace.starting_proficiency_options.choose > 1) {

            $('#race_proficiencies').append(`<div class="race_list" id="race_proficiencies_options"><p>Choose ${currentRace.language_options.choose} proficencies from this list</div>`)

            currentRace.starting_proficiency_options.from.forEach(element => {
                $('#race_proficiencies_options').append(`<div class="race_info race_list">
            <input type="checkbox" class="race_proficiencies_options" value="${element.name}"><span> ${element.name}</span></div>`);
            });

            $('.race_proficiencies_options').on('change', function () {
                if ($(`.race_proficiencies_options:checked`).length > currentRace.starting_proficiency_options.choose) {
                    this.checked = false;
                } else {
                    if (this.checked === true) {
                        if (characterProficiencies[`race_proficiencies_1`] === undefined) {
                            characterProficiencies[`race_proficiencies_1`] = {}
                        }
                        characterProficiencies[`race_proficiencies_1`][this.value] = [this.value];
                    } else {
                        delete characterProficiencies[`race_proficiencies_1`][this.value];
                    }
                    console.log(characterProficiencies);
                }
            })
        } else {
            $('#race_proficiencies').append(`<div class="race_list" id="race_proficiencies_options">
            <p>Choose ${currentRace.starting_proficiency_options.choose} proficency from this list</p>
            <div><select id="race_proficiencies_options_list"></select></div>
            </div>`)

            currentRace.starting_proficiency_options.from.forEach(element => {
                $('#race_proficiencies_options_list').append(`<option value="${element.name}">${element.name}</option>)`)
                console.log(element.name)
            });

            $('#race_proficiencies_options_list').on('change', function () {
                characterProficiencies[`race_proficiencies_1`] = {};
                characterProficiencies[`race_proficiencies_1`][$('#race_proficiencies_options_list').children("option:selected").val()] = $('#race_proficiencies_options_list').children("option:selected").val()
                console.log(characterProficiencies)
            });
        }
    }

    if (currentRace.traits.length > 0) {
        $(`#race_info_right`).append(`<div class="race_info" id="race_traits"><h6>Race Traits:</h6></div>`);
        currentRace.traits.forEach(element => {
            $(`#race_traits`).append(`<div class="race_list" id="race_${element.name}_trait">${element.name}</div>`);
            if (characterTraits[`race_traits_0`] === undefined) {
                characterTraits[`race_traits_0`] = {}
            }
            characterTraits[`race_traits_0`][`${element.name}`] = [`${element.name}`];
        });
    }

    if (currentRace.trait_options !== undefined) {

        if (`${currentRace.trait_options.choose}` > 1) {
            $('#race_traits').append(`<div class="race_list" id="race_trait_options">
            <div class="list_header">You can choose ${currentRace.trait_options.choose} traits from this list</div>
            <div><select id="race_trait_list"></select></div>
            </div>`)

            currentRace.trait_options.from.forEach(element => {
                $('#race_trait_options').append(`<div class="race_list">
                <input type="checkbox" class="race_trait_option" value="${element.name}"><span> ${element.name}</span>
                </div>`);
            });
            $('.race_trait_option').on('change', function () {
                if ($(`.race_trait_option:checked`).length > currentRace.trait_options.choose) {
                    this.checked = false;
                } else {
                    if (this.checked === true) {
                        if (characterTraits['race_traits_1'] === undefined) {
                            characterTraits[`race_traits_1`] = {}
                        }
                        characterTraits[`race_traits_1`][this.value] = [this.value];
                    } else {
                        delete characterTraits[`race_traits_1`][this.value];
                    }
                    console.log(characterTraits);
                }
            });
        } else {
            $('#race_traits').append(`<div class="list" id="race_trait_options">
        <div class="list_header">Choose ${currentRace.trait_options.choose} trait from this list</div>
        <div><select id="race_trait_list"></select></div>
        </div>`)

            currentRace.trait_options.from.forEach(element => {
                $('#race_trait_list').append(`<option value="${element.name}">${element.name}</option>`)
            });

            $('#race_trait_list').on('change', function () {
                characterTraits[`race_traits_1`] = {}
                characterTraits[`race_traits_1`][$('#race_trait_list').children("option:selected").val()] = [$('#race_trait_list').children("option:selected").val()];

                console.log(characterTraits);
            });
        }
    }
}

function resetRace() {
    base_ability, character_ability = [8, 8, 8, 8, 8, 8,];
    printBaseStats()
    characterProficiencies['race_proficiencies_0'] = {};
    characterProficiencies['race_proficiencies_1'] = {};
    characterLanguages['race_languages_0'] = {};
    characterLanguages['race_languages_1'] = {};
    characterTraits['race_traits_0'] = {};
    characterTraits['race_traits_1']
    $(`#race_info_container_left`).empty()
    $(`#race_info_container_right`).empty()

}

/* ---------- Class Logic ---------- */

function currentClassInformation(currentClass, spellCasting) {

    $('#class_info_container_left').append('<div class="general_info_styling" id="class_info_left"></div>');
    $('#class_info_container_right').append('<div class="general_info_styling" id="class_info_right"></div>');


    Object.keys(currentClass).forEach(element => {
        // //This looks through the array, and if the current element key is part of the array it runs "return". This is to only get the correct div's created.
        // if (["_id", "index", "subclasses", "proficiencies", "proficiency_choices", "saving_throws", "starting_equipment", "class_levels", "spellcasting", "url"].indexOf(element) >= 0) {
        //     return;
        // }
        // $(`#class_info_container`).append(`<div class="class_info_container" id="class_${element}_container">
        //     <p id="class_${element}">${currentClass[element]}</p>`);
    });

    $('#class_info_left').append(`<div class="class_info">
    <h4>${currentClass.name}</h4></div>`);

    $('#class_info_left').append(`<div class="class_info">
    <h6>Hit Dice:</h6>
    <h6>d${currentClass.hit_die}</h6></div>`);

    $('#class_info_left').append(`<div class="class_info" id="class_saving_throws">
    <h6>Saving Throws:</h6>`);
    currentClass.saving_throws.forEach(element => {
        if (characterSaves[`race_languages_0`] === undefined) {
            characterSaves[`race_languages_0`] = {}
        }
        characterSaves[`race_languages_0`][element.name] = element.name;
        $('#class_saving_throws').append(`<div class="class_list">${element.name}<div>`)
    });

    //Populate the proficency list and add values to characterProficencies Object
    $(`#class_info_container`).append(`<div class="class_skill_list" id="proficiencies"><h6>Proficencies</h6></div>`);
    currentClass.proficiencies.forEach(element => {
        $(`#proficiencies`).append(`<div class="class_info_container" id="class_${element.name}_container">
             <p id="class_${element.name}">${element.name}</p></div>`);
        if (characterProficiencies[`class_proficiencies_0`] === undefined) {
            characterProficiencies[`class_proficiencies_0`] = {}
        } else {
            characterProficiencies[`class_proficiencies_0`] = {};
        }
        characterProficiencies[`class_proficiencies_0`][`${element.name}`] = element.name;
    });
    
    console.log(spellCasting)

    //Populate and create forms for proficency choices and add values to characterProficencies Object
    currentClass.proficiency_choices.forEach((element, i) => {
        if (element.choose > 1) {
            $(`#class_info_container`).append(`<div class="class_skill_list" id="proficency_${i}"></div>`);
            $(`#proficency_${i}`).append(`<div class="class_info_container" id="class_${element.name}_container">
            <p>You can choose ${element.choose} from this list</p></div>`);

            element.from.forEach(element => {
                $(`#proficency_${i}`).append(`<div class="class_info_container">
            <input type="checkbox" class="class_proficiencies_${i}" value="${element.name}"><span> ${element.name}</span></div>`);
            });

            $(`.class_proficiencies_${i}`).on('change', function () {
                if ($(`.class_proficiencies_${i}:checked`).length > element.choose) {
                    this.checked = false;
                } else {
                    if (this.checked === true) {
                        if (characterProficiencies[`class_proficiencies_${i + 1}`] === undefined) {
                            characterProficiencies[`class_proficiencies_${i + 1}`] = {}
                        }
                        characterProficiencies[`class_proficiencies_${i + 1}`][this.value] = this.value;
                    } else {
                        delete characterProficiencies[`class_proficiencies_${i + 1}`][this.value];
                    }

                    console.log(characterProficiencies);
                }
            })
        } else {
            $('#class_info_container').append(`<div class="class_info_container" id="class_prof_options${i}">
        <div class="list_header">You can choose ${element.choose} proficency from this list</div>
        <div><select id="class_prof_list${i}"></select></div>
        </div>`)

            element.from.forEach(element => {
                $(`#class_prof_list${i}`).append(`<option value="${element.name}">${element.name}</option>`)
            });

            $(`#class_prof_list${i}`).on('change', function () {
                characterProficiencies[`class_proficiencies_${i + 1}`] = {}
                characterProficiencies[`class_proficiencies_${i + 1}`][$(`#class_prof_list${i}`).children("option:selected").val()] = $(`#class_prof_list${i}`).children("option:selected").val();

                console.log(characterProficiencies);
            });
        }
    });
}

function resetClass() {
    $(`#class_info_container_left`).empty();
    $(`#class_info_container_right`).empty();
    characterProficiencies['class_proficiencies_0'] = {};
    characterProficiencies['class_proficiencies_1'] = {};
    characterProficiencies['class_proficiencies_2'] = {};
    characterProficiencies['class_proficiencies_3'] = {};
}