import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    officialDetails: {
      enrollmentNum: {
        type: String,
      },
      programName: {
        type: String,
      },
      batchOfYear: {
        type: Number,
      },
    },
    personalDetails: {
      studentName: {
        inEnglish: {
          type: String,

        },
        inHindi: {
          type: String,

        },
      },
      picture: {
        type: Buffer,
        contentType: String,
      },
      dob: {
        type: Date,
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      bloodGroup: {
        type: String,
      },
      pwd: {
        type: Boolean,
      },
      category: {
        type: String,
        enum: ["ST", "SC", "OBC", "GEN"],
      },
      aadhaarNum: {
        type: Number,
      },
      maritalStatus: {
        type: Boolean,
      },
      nationality: {
        type: String,
        dafault: "indian",
      },
      religion: {
        type: String,
      },
      phoneNum: {
        type: String,
      },
      emailId: {
        type: String,
        unique: true,
      },
      hobbies: {
        type: String,
      },
      communAddress: {
        address: {
            type: String,
        },
        district: {
            type: String,
        },
        state: {
            type: String,
        },
        pincode: {
            type: String,
        },
      },
      permanentAddress: {
        address: {
            type: String,
        },
        district: {
            type: String,
        },
        state: {
            type: String,
        },
        pincode: {
            type: String,
        }, 
      },
      gateExam: {
        rollNum: {
          type: String,
        },
        score: {
          type: Number,
        },
        rank: {
          type: String,
        },
        year: {
          type: Number,
        },
        branch: {
          type: String,
        },
      },
    },
    parentsDetails: {
        father: {
            name: {
                type: String,
            },
            designation: {
                type: String,
            },
            phoneNum: {
                type: String,
            },
            emailId: {
                type: String,
            }
        },
        mother: {
            name: {
                type: String,
            },
            designation: {
                type: String,
            },
            phoneNum: {
                type: String,
            },
            emailId: {
                type: String,
            }
        },
        guardian: {
            name: {
                type: String,
            },
            phoneNum: {
                type: String,
            },
            relation: {
                type: String,
            },
            address: {
                type: String,
            }
        },
    },
    academicDetails: {
        degree: [{
            name: {
                type: String,
                enum: ['High School', 'Intermediate', 'Graduation'],
            },
            subjects: {
                type: String,
            },
            board: {
                type: String,
            },
            year: {
                type: Number,
            },
            division: {
                type: String,
            },
            marks: {
                type: Number,
            },
            totalMarks: {
                type: Number,
            },
            grade: {
                type: String,
            },
            degreeNum: {
                type: Number,
            },
        }]
    },
    documents: [{
        type: mongoose.Types.ObjectId,
        ref: 'Document'
    }],
    role: {
        type: String,
        required: true,
        enum: ['student', 'admin'],
        default: 'student',
    },
    loginDetails: {
        applicationId: {
            type: Number,
        },
        dob: {
            type: Date.parse() ,
        }
    },
    registrationStatus: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

const Student = mongoose.model("Students", StudentSchema);
export default Student;
