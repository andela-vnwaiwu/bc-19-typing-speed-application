describe('Typing Speed Application test suite', function() {

    beforeEach(function() {
        this.testNote = new TypeSpeedApplication('username', 'password');

    });

    describe('Notes Application', function () {

        it('should ensure that the author is set', function() {

            expect(this.testNote.author).toBe('username');
        });

        it('should ensure that the initial note length is empty', function(){
            expect(this.testNote.notes.length).toBe(0);
        });

        it('author should be a string', function() {
            expect(typeof this.testNote.author).toBe(typeof 'string');
        });

    });

    describe('Create Function', function() {
        it('should create a note for user', function() {
            this.testNote.create('We are in the first week of the bootcamp');
            expect(this.testNote.notes.length).toBe(1);
            this.testNote.create('We are in the first week of the bootcamp');
            expect(this.testNote.notes.length).toBe(2);
        });
    });

    describe('List notes by author', function() {
        it('should list all notes by an author', function() {
            this.testNote.create("We are in the first week of the bootcamp");
            var ans = this.testNote.listNotes();
            expect(ans).not.toBeNull();
        });
    })

    describe('get notes by ID', function() {
        it('should return the note of given id', function() {
            this.testNote.create('We are in the first week of the bootcamp');
            var ans = this.testNote.get(1);
            expect(ans).toBeDefined();
        });

        it('should not return a note', function () {
            this.testNote.create('We are in the first week of the bootcamp');
            var ans = this.testNote.get(2);
            expect(typeof ans).toBe(typeof'string');
        });
    });

    describe('return search text in note list', function() {
            it('should return the note details', function() {
                this.testNote.create('We are in the first week of the bootcamp');
                var ans = this.testNote.search('week');
                expect(ans).not.toBeNull();
            });

            it('should not return note details', function () {
                this.testNote.create('We are in the first week of the bootcamp');
                var ans = this.testNote.search('before');
                expect(ans).not.toBeDefined();
            });
    });

});
