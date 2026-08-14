// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Arabic Dialogue & Cutscene Engine
// ============================================================================

const STAGE_DIALOGUES = {
  1: {
    intro: [
      { speaker: 'banderita', name: 'بندريتا', text: 'ما هذا الإنذار؟! عداد المشتركين يتناقص بالملايين في ثوانٍ معدودة!' },
      { speaker: 'banderita', name: 'بندريتا', text: 'يبدو أن فيروسات الخوارزمية المظلمة بدأت هجومها الشامل على يوتيوب سيتي!' },
      { speaker: 'banderita', name: 'بندريتا', text: 'عليّ جمع 15 كيس بطاطس ذهبي لشحن طاقتي النارية وفتح بوابة الخروج!' }
    ],
    outro: [
      { speaker: 'banderita', name: 'بندريتا', text: 'كفووو! تم شحن الطاقة بالكامل، والآن سأنطلق بأقصى سرعة نحو السيرفرات!' }
    ]
  },
  2: {
    intro: [
      { speaker: 'banderita', name: 'بندريتا', text: 'جدران الحماية النارية واللاغ يغلقون الممرات! إذا لم أصل في أقل من 45 ثانية سأُحظر!' },
      { speaker: 'banderita', name: 'بندريتا', text: 'حان وقت تفعيل وميض السرعة الخارقة (Flash Dash)! يا رب ما أعلق!' }
    ],
    outro: [
      { speaker: 'banderita', name: 'بندريتا', text: 'يسسس! تجاوزت الجدار قبل إغلاق السيرفر! لا يوجد لاغ يستطيع إيقافي!' }
    ]
  },
  3: {
    intro: [
      { speaker: 'banderita', name: 'بندريتا', text: 'يا ساتر! روبوتات الجليتش تحاصر أفران التميس الأسطورية لقطع إمدادات الطاقة!' },
      { speaker: 'banderita', name: 'بندريتا', text: 'سأقضي على 12 روبوت جليتش معتدين وأستعيد أفران التميس فوراً!' }
    ],
    outro: [
      { speaker: 'banderita', name: 'بندريتا', text: 'تم تنظيف المخبز بالكامل! والآن باتجاه برج البث المركزي!' }
    ]
  },
  4: {
    intro: [
      { speaker: 'boss_lag', name: 'وحش اللاغ العملاق', text: 'بفففففففف... لن تبث مقطعاً واحداً بعد اليوم يا بندريتا! سأجعل البينغ 9999ms!' },
      { speaker: 'banderita', name: 'بندريتا', text: 'تحلم! خذ ضربة التميس الناري وإعصار البطاطس يا وحش اللاغ!' }
    ],
    outro: [
      { speaker: 'banderita', name: 'بندريتا', text: 'تم تدمير وحش اللاغ وفتح خط الاتصال مع ملزلز في غابة الرعب!' }
    ]
  },
  5: {
    intro: [
      { speaker: 'mlzlz', name: 'ملزلز', text: 'أهلاً بندريتا، استلمت إشارتك... أنا الآن في أعماق غابة الألعاب المعتمة.' },
      { speaker: 'mlzlz', name: 'ملزلز', text: 'الظلام دامس هنا... سأستخدم كاسة الشاي الساخن لإشعال الفوانيس الخمسة وكشف الدرب.' }
    ],
    outro: [
      { speaker: 'mlzlz', name: 'ملزلز', text: 'رائع، إشراق فوانيس الشاي كشف الطريق نحو قصر الأسرار.' }
    ]
  },
  6: {
    intro: [
      { speaker: 'mlzlz', name: 'ملزلز', text: 'غرفة مليئة بالجامب سكيرز والأشباح؟ هههه... أنتم لا تعرفون مع من تعبثون.' },
      { speaker: 'mlzlz', name: 'ملزلز', text: 'سأرتشف الشاي بهدوء تام وأصمد 60 ثانية حتى تنتهي هذه المهزلة.' }
    ],
    outro: [
      { speaker: 'mlzlz', name: 'ملزلز', text: 'هدوء تكتيكي لا مثيل له. كاسة شاي أخرى قبل اقتحام القصر!' }
    ]
  },
  7: {
    intro: [
      { speaker: 'mlzlz', name: 'ملزلز', text: 'القصر محمي بجدران وهمية... رذاذ الشاي المغلي سيكشف الجدران السرية.' },
      { speaker: 'mlzlz', name: 'ملزلز', text: 'يجب أن أجد 3 مفاتيح مشفرة لفك إحداثيات السيرفر السحابي!' }
    ],
    outro: [
      { speaker: 'mlzlz', name: 'ملزلز', text: 'عثرت على المفاتيح وفككت الشفرة! أوسمز، هل تسمعني؟ سماء السيرفرات بانتظارك!' }
    ]
  },
  8: {
    intro: [
      { speaker: 'boss_dislike', name: 'شبح الديسلايك الأسود', text: 'سأغرق قنواتكم في بحر الديسلايكات والتعليقات السلبية المظلمة!' },
      { speaker: 'mlzlz', name: 'ملزلز', text: 'تتكلم كثيراً يا شبح... تذوق طعم الشاي المركز الساخن واختفِ من هنا!' }
    ],
    outro: [
      { speaker: 'mlzlz', name: 'ملزلز', text: 'تبخر شبح الديسلايك وتحرر الدرع الفضي! الدور عليك يا أوسمز!' }
    ]
  },
  9: {
    intro: [
      { speaker: 'ocmz', name: 'أوسمز', text: 'يا هلا بالشباب! أوسمز وصل وقبعة القش جاهزة للإبحار في سماء البلوكات!' },
      { speaker: 'ocmz', name: 'أوسمز', text: 'القراصنة الطائرون يحاصرون الجزر... حان وقت رمي قبعة القش كبوميرانج قاطع!' }
    ],
    outro: [
      { speaker: 'ocmz', name: 'أوسمز', text: 'تم إسقاط جميع قراصنة الجليتش! سماء السيرفرات أصبحت نظيفة!' }
    ]
  },
  10: {
    intro: [
      { speaker: 'ocmz', name: 'أوسمز', text: 'السفينة الجوية بدون وقود! أحتاج لجمع 4 بطاريات داتا لتشغيل المحركات النفاثة.' },
      { speaker: 'ocmz', name: 'أوسمز', text: 'سأستخدم القفز الثلاثي للتنقل بين الجزر السحابية المعلقة.' }
    ],
    outro: [
      { speaker: 'ocmz', name: 'أوسمز', text: 'المحركات تعمل بكفاءة 100%! السفينة جاهزة للإقلاع!' }
    ]
  },
  11: {
    intro: [
      { speaker: 'ocmz', name: 'أوسمز', text: 'عاصفة سحابية تهدم المنصات! لا مجال للخطأ... السقوط يعني النهاية (Zero Fall)!' },
      { speaker: 'ocmz', name: 'أوسمز', text: 'ثقتي بقفزاتي الثلاثية والانزلاق الجوي لا حدود لها!' }
    ],
    outro: [
      { speaker: 'ocmz', name: 'أوسمز', text: 'باركور أسطوري لا يتقنه إلا محترفو الماينكرافت!' }
    ]
  },
  12: {
    intro: [
      { speaker: 'boss_ban_captain', name: 'كابتن الباند الطائر', text: 'منطادي يحمل صواريخ الحظر الشامل! لن تصلوا لمناجم الريدستون أبداً!' },
      { speaker: 'ocmz', name: 'أوسمز', text: 'سنرى من يسقط أولاً! خذ ضربة البوميرانج ومطارة البلوكات المتفجرة!' }
    ],
    outro: [
      { speaker: 'ocmz', name: 'أوسمز', text: 'سقط منطاد كابتن الباند! انتزعت بوصلة الملاحة... أبو عابد، الساحة لك في المناجم!' }
    ]
  },
  13: {
    intro: [
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'أهلاً وسهلاً! أبو عابد في الورشة والمناجم... حان وقت الشغل الثقيل!' },
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'أحتاج لجمع 20 سبيكة ريدستون نقية لصناعة دروع وأسلحة المعركة الفاصلة.' }
    ],
    outro: [
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'سبائك الريدستون جاهزة، وطاقة الورشة في أعلى مستوياتها!' }
    ]
  },
  14: {
    intro: [
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'غرفة الألغاز الضوئية مقفلة... الحل عندي بالصلعة الذهبية العاكسة للشمس!' },
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'سأوجه شعاع الصلعة على المرايا الأربع لفتح البوابة الفولاذية!' }
    ],
    outro: [
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'هههه! لمعان الصلعة الذهبية فتح البوابة بامتياز!' }
    ]
  },
  15: {
    intro: [
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'إنذار طوارئ! عناكب إلكترونية تهاجم المولد الرئيسي للوحة الأم!' },
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'سأضع برج الريدستون الآلي وأدافع عن المولد بكل ما أوتيت من قوة لمدة 75 ثانية!' }
    ],
    outro: [
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'تمت حماية المولد بنجاح وصمدنا حتى النهاية!' }
    ]
  },
  16: {
    intro: [
      { speaker: 'boss_drill', name: 'حفار الجليتش العملاق', text: 'قررررررر... سأحفر وأسحق كل ما بنيتموه في هذه المناجم!' },
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'درعي الخارق يتحمل نصف ضرباتك! خذ ضربة الصلعة والشاكوش يا حفار الخردة!' }
    ],
    outro: [
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'تحطم الحفار وفُتح النفق المباشر للوحة الأم! أوبلز، المفك جاهز للاختراق!' }
    ]
  },
  17: {
    intro: [
      { speaker: 'opiilz', name: 'أوبلز', text: 'أوبلز في قلب اللوحة الأم! نظام الحماية بدأ العد التنازلي (60 ثانية)!' },
      { speaker: 'opiilz', name: 'أوبلز', text: 'سأستخدم المفك الأسطوري لتفكيك 6 دوائر أمان كهربائية قبل إغلاق النظام!' }
    ],
    outro: [
      { speaker: 'opiilz', name: 'أوبلز', text: 'تم اختراق وتفكيك الدوائر الست في وقت قياسي!' }
    ]
  },
  18: {
    intro: [
      { speaker: 'opiilz', name: 'أوبلز', text: 'غرفة تبريد السيرفرات مليئة بالنيتروجين وأشعة الليزر القاتلة!' },
      { speaker: 'opiilz', name: 'أوبلز', text: 'كمهندس حماية، سأعطل أفخاخ الليزر وأجمد الصمامات الخمسة للوصول للقمة!' }
    ],
    outro: [
      { speaker: 'opiilz', name: 'أوبلز', text: 'تم تعطيل نظام التبريد وفُتحت أبواب برج الحظر المركزي!' }
    ]
  },
  19: {
    intro: [
      { speaker: 'banderita', name: 'بندريتا', text: 'يا شباب! اجتمعنا أخيراً أمام بوابة الحصن النهائي!' },
      { speaker: 'mlzlz', name: 'ملزلز', text: 'الشاي جاهز والتركيز 100%... لن يمر أي حارس نخبوي.' },
      { speaker: 'ocmz', name: 'أوسمز', text: 'قبعة القش والبلوكات مستعدة لتمزيق خطوط الدفاع!' },
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'والصلعة الذهبية مشحونة بأقوى أشعة الشمس!' },
      { speaker: 'opiilz', name: 'أوبلز', text: 'والمفك الأسطوري ولوح النيون بالمرصاد! 20 حارساً نخبوي ونسحقهم جميعاً!' }
    ],
    outro: [
      { speaker: 'banderita', name: 'بندريتا', text: 'سحقنا حراس النخبة! أبواب قاعة الخوارزمية المظلمة مفتوحة... إلى المعركة الكبرى!' }
    ]
  },
  20: {
    intro: [
      { speaker: 'boss_algo', name: 'الخوارزمية المظلمة (Error 404)', text: 'أنا الكيان الذي يتحكم بمليارات المشاهدات والمشتركين! سأحذف قنواتكم جميعاً من الوجود!' },
      { speaker: 'banderita', name: 'بندريتا', text: 'ملايين المتابعين وثقتهم هي قوتنا الحقيقية!' },
      { speaker: 'mlzlz', name: 'ملزلز', text: 'أساطير الجيمنج العرب لا يستسلمون أمام أي خوارزمية!' },
      { speaker: 'abuAbed', name: 'أبو عابد', text: 'معاً كفريق واحد... سنكسر كود الباند النهائي!' }
    ],
    outro: [
      { speaker: 'boss_algo', name: 'الخوارزمية المظلمة', text: 'مستحيل... تم تصحيح الكود... Error 404 Resolved... كُسر الحظر!' },
      { speaker: 'banderita', name: 'بندريتا', text: 'كفووووووووووووووووووووووو يا أساطييييييييل!' },
      { speaker: 'ocmz', name: 'أوسمز', text: 'عادت ملايين المشتركين واشتعلت منصة اليوتيوب من جديد!' },
      { speaker: 'opiilz', name: 'أوبلز', text: 'شكراً لكل متابع عربي ساندنا في هذه الملحمة التاريخية! 👑' }
    ]
  }
};

class DialogueManager {
  constructor() {
    this.modal = document.getElementById('dialogue-modal');
    this.avatarEl = document.getElementById('dialogue-avatar');
    this.nameEl = document.getElementById('dialogue-speaker-name');
    this.textEl = document.getElementById('dialogue-text');
    this.btnNext = document.getElementById('dialogue-btn-next');
    this.btnSkip = document.getElementById('dialogue-btn-skip');

    this.currentDialogueQueue = [];
    this.currentIndex = 0;
    this.typewriterTimer = null;
    this.fullCurrentText = '';
    this.isTyping = false;
    this.onCompleteCallback = null;

    this.setupListeners();
  }

  setupListeners() {
    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => this.advance());
    }
    if (this.btnSkip) {
      this.btnSkip.addEventListener('click', () => this.skipAll());
    }

    // Keyboard trigger (Space / Enter)
    window.addEventListener('keydown', (e) => {
      if (window.game && window.game.state === 'dialogue') {
        if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyJ') {
          e.preventDefault();
          this.advance();
        }
      }
    });
  }

  startDialogue(stageIndex, type = 'intro', onComplete = null) {
    const stageData = STAGE_DIALOGUES[stageIndex];
    if (!stageData || !stageData[type] || stageData[type].length === 0) {
      if (onComplete) onComplete();
      return;
    }

    this.currentDialogueQueue = stageData[type];
    this.currentIndex = 0;
    this.onCompleteCallback = onComplete;

    if (this.modal) this.modal.classList.remove('hidden');
    if (window.game) window.game.state = 'dialogue';

    this.showCurrentLine();
  }

  showCurrentLine() {
    if (this.currentIndex >= this.currentDialogueQueue.length) {
      this.finish();
      return;
    }

    const item = this.currentDialogueQueue[this.currentIndex];
    this.fullCurrentText = item.text;
    this.isTyping = true;

    // Update Avatar & Speaker Name
    if (this.avatarEl) {
      this.avatarEl.className = `dialogue-avatar avatar-${item.speaker}`;
    }
    if (this.nameEl) {
      this.nameEl.textContent = item.name;
    }

    // Start Typewriter
    if (this.textEl) this.textEl.textContent = '';
    let charIndex = 0;

    if (this.typewriterTimer) clearInterval(this.typewriterTimer);

    this.typewriterTimer = setInterval(() => {
      if (charIndex < this.fullCurrentText.length) {
        if (this.textEl) this.textEl.textContent += this.fullCurrentText[charIndex];
        if (charIndex % 3 === 0 && window.audio) {
          window.audio.playDialogueBleep();
        }
        charIndex++;
      } else {
        clearInterval(this.typewriterTimer);
        this.typewriterTimer = null;
        this.isTyping = false;
      }
    }, 28);
  }

  advance() {
    if (this.isTyping) {
      // Complete current line immediately
      if (this.typewriterTimer) clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
      if (this.textEl) this.textEl.textContent = this.fullCurrentText;
      this.isTyping = false;
    } else {
      // Next line
      this.currentIndex++;
      this.showCurrentLine();
    }
  }

  skipAll() {
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    this.typewriterTimer = null;
    this.finish();
  }

  finish() {
    if (this.modal) this.modal.classList.add('hidden');
    const cb = this.onCompleteCallback;
    this.onCompleteCallback = null;
    if (cb) cb();
  }
}

window.STAGE_DIALOGUES = STAGE_DIALOGUES;
window.DialogueManager = DialogueManager;
